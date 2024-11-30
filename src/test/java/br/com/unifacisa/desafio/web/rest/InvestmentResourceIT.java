package br.com.unifacisa.desafio.web.rest;

import static br.com.unifacisa.desafio.domain.InvestmentAsserts.*;
import static br.com.unifacisa.desafio.web.rest.TestUtil.createUpdateProxyForBean;
import static br.com.unifacisa.desafio.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.unifacisa.desafio.IntegrationTest;
import br.com.unifacisa.desafio.domain.Investment;
import br.com.unifacisa.desafio.domain.enumeration.InvestmentType;
import br.com.unifacisa.desafio.repository.InvestmentRepository;
import br.com.unifacisa.desafio.service.dto.InvestmentDTO;
import br.com.unifacisa.desafio.service.mapper.InvestmentMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link InvestmentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class InvestmentResourceIT {

    private static final String DEFAULT_INVESTMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_INVESTMENT_NAME = "BBBBBBBBBB";

    private static final InvestmentType DEFAULT_INVESTMENT_TYPE = InvestmentType.STOCKS;
    private static final InvestmentType UPDATED_INVESTMENT_TYPE = InvestmentType.BONDS;

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/investments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private InvestmentMapper investmentMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInvestmentMockMvc;

    private Investment investment;

    private Investment insertedInvestment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Investment createEntity() {
        return new Investment()
            .investmentName(DEFAULT_INVESTMENT_NAME)
            .investmentType(DEFAULT_INVESTMENT_TYPE)
            .amount(DEFAULT_AMOUNT)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Investment createUpdatedEntity() {
        return new Investment()
            .investmentName(UPDATED_INVESTMENT_NAME)
            .investmentType(UPDATED_INVESTMENT_TYPE)
            .amount(UPDATED_AMOUNT)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
    }

    @BeforeEach
    public void initTest() {
        investment = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedInvestment != null) {
            investmentRepository.delete(insertedInvestment);
            insertedInvestment = null;
        }
    }

    @Test
    @Transactional
    void createInvestment() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Investment
        InvestmentDTO investmentDTO = investmentMapper.toDto(investment);
        var returnedInvestmentDTO = om.readValue(
            restInvestmentMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(investmentDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            InvestmentDTO.class
        );

        // Validate the Investment in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedInvestment = investmentMapper.toEntity(returnedInvestmentDTO);
        assertInvestmentUpdatableFieldsEquals(returnedInvestment, getPersistedInvestment(returnedInvestment));

        insertedInvestment = returnedInvestment;
    }

    @Test
    @Transactional
    void createInvestmentWithExistingId() throws Exception {
        // Create the Investment with an existing ID
        investment.setId(1L);
        InvestmentDTO investmentDTO = investmentMapper.toDto(investment);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restInvestmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(investmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Investment in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkInvestmentNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        investment.setInvestmentName(null);

        // Create the Investment, which fails.
        InvestmentDTO investmentDTO = investmentMapper.toDto(investment);

        restInvestmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(investmentDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkInvestmentTypeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        investment.setInvestmentType(null);

        // Create the Investment, which fails.
        InvestmentDTO investmentDTO = investmentMapper.toDto(investment);

        restInvestmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(investmentDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAmountIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        investment.setAmount(null);

        // Create the Investment, which fails.
        InvestmentDTO investmentDTO = investmentMapper.toDto(investment);

        restInvestmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(investmentDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStartDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        investment.setStartDate(null);

        // Create the Investment, which fails.
        InvestmentDTO investmentDTO = investmentMapper.toDto(investment);

        restInvestmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(investmentDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllInvestments() throws Exception {
        // Initialize the database
        insertedInvestment = investmentRepository.saveAndFlush(investment);

        // Get all the investmentList
        restInvestmentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(investment.getId().intValue())))
            .andExpect(jsonPath("$.[*].investmentName").value(hasItem(DEFAULT_INVESTMENT_NAME)))
            .andExpect(jsonPath("$.[*].investmentType").value(hasItem(DEFAULT_INVESTMENT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(sameNumber(DEFAULT_AMOUNT))))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }

    @Test
    @Transactional
    void getInvestment() throws Exception {
        // Initialize the database
        insertedInvestment = investmentRepository.saveAndFlush(investment);

        // Get the investment
        restInvestmentMockMvc
            .perform(get(ENTITY_API_URL_ID, investment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(investment.getId().intValue()))
            .andExpect(jsonPath("$.investmentName").value(DEFAULT_INVESTMENT_NAME))
            .andExpect(jsonPath("$.investmentType").value(DEFAULT_INVESTMENT_TYPE.toString()))
            .andExpect(jsonPath("$.amount").value(sameNumber(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingInvestment() throws Exception {
        // Get the investment
        restInvestmentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingInvestment() throws Exception {
        // Initialize the database
        insertedInvestment = investmentRepository.saveAndFlush(investment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the investment
        Investment updatedInvestment = investmentRepository.findById(investment.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedInvestment are not directly saved in db
        em.detach(updatedInvestment);
        updatedInvestment
            .investmentName(UPDATED_INVESTMENT_NAME)
            .investmentType(UPDATED_INVESTMENT_TYPE)
            .amount(UPDATED_AMOUNT)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        InvestmentDTO investmentDTO = investmentMapper.toDto(updatedInvestment);

        restInvestmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, investmentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(investmentDTO))
            )
            .andExpect(status().isOk());

        // Validate the Investment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedInvestmentToMatchAllProperties(updatedInvestment);
    }

    @Test
    @Transactional
    void putNonExistingInvestment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        investment.setId(longCount.incrementAndGet());

        // Create the Investment
        InvestmentDTO investmentDTO = investmentMapper.toDto(investment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvestmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, investmentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(investmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Investment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchInvestment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        investment.setId(longCount.incrementAndGet());

        // Create the Investment
        InvestmentDTO investmentDTO = investmentMapper.toDto(investment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInvestmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(investmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Investment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamInvestment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        investment.setId(longCount.incrementAndGet());

        // Create the Investment
        InvestmentDTO investmentDTO = investmentMapper.toDto(investment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInvestmentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(investmentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Investment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateInvestmentWithPatch() throws Exception {
        // Initialize the database
        insertedInvestment = investmentRepository.saveAndFlush(investment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the investment using partial update
        Investment partialUpdatedInvestment = new Investment();
        partialUpdatedInvestment.setId(investment.getId());

        partialUpdatedInvestment.investmentName(UPDATED_INVESTMENT_NAME).endDate(UPDATED_END_DATE);

        restInvestmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInvestment.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedInvestment))
            )
            .andExpect(status().isOk());

        // Validate the Investment in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertInvestmentUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedInvestment, investment),
            getPersistedInvestment(investment)
        );
    }

    @Test
    @Transactional
    void fullUpdateInvestmentWithPatch() throws Exception {
        // Initialize the database
        insertedInvestment = investmentRepository.saveAndFlush(investment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the investment using partial update
        Investment partialUpdatedInvestment = new Investment();
        partialUpdatedInvestment.setId(investment.getId());

        partialUpdatedInvestment
            .investmentName(UPDATED_INVESTMENT_NAME)
            .investmentType(UPDATED_INVESTMENT_TYPE)
            .amount(UPDATED_AMOUNT)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restInvestmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInvestment.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedInvestment))
            )
            .andExpect(status().isOk());

        // Validate the Investment in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertInvestmentUpdatableFieldsEquals(partialUpdatedInvestment, getPersistedInvestment(partialUpdatedInvestment));
    }

    @Test
    @Transactional
    void patchNonExistingInvestment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        investment.setId(longCount.incrementAndGet());

        // Create the Investment
        InvestmentDTO investmentDTO = investmentMapper.toDto(investment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvestmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, investmentDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(investmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Investment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchInvestment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        investment.setId(longCount.incrementAndGet());

        // Create the Investment
        InvestmentDTO investmentDTO = investmentMapper.toDto(investment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInvestmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(investmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Investment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamInvestment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        investment.setId(longCount.incrementAndGet());

        // Create the Investment
        InvestmentDTO investmentDTO = investmentMapper.toDto(investment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInvestmentMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(investmentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Investment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteInvestment() throws Exception {
        // Initialize the database
        insertedInvestment = investmentRepository.saveAndFlush(investment);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the investment
        restInvestmentMockMvc
            .perform(delete(ENTITY_API_URL_ID, investment.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return investmentRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Investment getPersistedInvestment(Investment investment) {
        return investmentRepository.findById(investment.getId()).orElseThrow();
    }

    protected void assertPersistedInvestmentToMatchAllProperties(Investment expectedInvestment) {
        assertInvestmentAllPropertiesEquals(expectedInvestment, getPersistedInvestment(expectedInvestment));
    }

    protected void assertPersistedInvestmentToMatchUpdatableProperties(Investment expectedInvestment) {
        assertInvestmentAllUpdatablePropertiesEquals(expectedInvestment, getPersistedInvestment(expectedInvestment));
    }
}
