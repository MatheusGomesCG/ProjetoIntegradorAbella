package br.com.unifacisa.desafio.web.rest;

import static br.com.unifacisa.desafio.domain.AccountUserAsserts.*;
import static br.com.unifacisa.desafio.web.rest.TestUtil.createUpdateProxyForBean;
import static br.com.unifacisa.desafio.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.unifacisa.desafio.IntegrationTest;
import br.com.unifacisa.desafio.domain.AccountUser;
import br.com.unifacisa.desafio.domain.enumeration.AccountStatus;
import br.com.unifacisa.desafio.domain.enumeration.AccountType;
import br.com.unifacisa.desafio.repository.AccountUserRepository;
import br.com.unifacisa.desafio.service.dto.AccountUserDTO;
import br.com.unifacisa.desafio.service.mapper.AccountUserMapper;
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
 * Integration tests for the {@link AccountUserResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AccountUserResourceIT {

    private static final String DEFAULT_ACCOUNT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NUMBER = "BBBBBBBBBB";

    private static final AccountType DEFAULT_ACCOUNT_TYPE = AccountType.SAVINGS;
    private static final AccountType UPDATED_ACCOUNT_TYPE = AccountType.CURRENT;

    private static final BigDecimal DEFAULT_BALANCE = new BigDecimal(1);
    private static final BigDecimal UPDATED_BALANCE = new BigDecimal(2);

    private static final Instant DEFAULT_CREATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final AccountStatus DEFAULT_STATUS = AccountStatus.ACTIVE;
    private static final AccountStatus UPDATED_STATUS = AccountStatus.SUSPENDED;

    private static final String ENTITY_API_URL = "/api/account-users";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AccountUserRepository accountUserRepository;

    @Autowired
    private AccountUserMapper accountUserMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAccountUserMockMvc;

    private AccountUser accountUser;

    private AccountUser insertedAccountUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountUser createEntity() {
        return new AccountUser()
            .accountNumber(DEFAULT_ACCOUNT_NUMBER)
            .accountType(DEFAULT_ACCOUNT_TYPE)
            .balance(DEFAULT_BALANCE)
            .creationDate(DEFAULT_CREATION_DATE)
            .status(DEFAULT_STATUS);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountUser createUpdatedEntity() {
        return new AccountUser()
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .accountType(UPDATED_ACCOUNT_TYPE)
            .balance(UPDATED_BALANCE)
            .creationDate(UPDATED_CREATION_DATE)
            .status(UPDATED_STATUS);
    }

    @BeforeEach
    public void initTest() {
        accountUser = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedAccountUser != null) {
            accountUserRepository.delete(insertedAccountUser);
            insertedAccountUser = null;
        }
    }

    @Test
    @Transactional
    void createAccountUser() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the AccountUser
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);
        var returnedAccountUserDTO = om.readValue(
            restAccountUserMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(accountUserDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AccountUserDTO.class
        );

        // Validate the AccountUser in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedAccountUser = accountUserMapper.toEntity(returnedAccountUserDTO);
        assertAccountUserUpdatableFieldsEquals(returnedAccountUser, getPersistedAccountUser(returnedAccountUser));

        insertedAccountUser = returnedAccountUser;
    }

    @Test
    @Transactional
    void createAccountUserWithExistingId() throws Exception {
        // Create the AccountUser with an existing ID
        accountUser.setId(1L);
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(accountUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AccountUser in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkAccountNumberIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        accountUser.setAccountNumber(null);

        // Create the AccountUser, which fails.
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);

        restAccountUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(accountUserDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAccountTypeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        accountUser.setAccountType(null);

        // Create the AccountUser, which fails.
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);

        restAccountUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(accountUserDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkBalanceIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        accountUser.setBalance(null);

        // Create the AccountUser, which fails.
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);

        restAccountUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(accountUserDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCreationDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        accountUser.setCreationDate(null);

        // Create the AccountUser, which fails.
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);

        restAccountUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(accountUserDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStatusIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        accountUser.setStatus(null);

        // Create the AccountUser, which fails.
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);

        restAccountUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(accountUserDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllAccountUsers() throws Exception {
        // Initialize the database
        insertedAccountUser = accountUserRepository.saveAndFlush(accountUser);

        // Get all the accountUserList
        restAccountUserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].accountNumber").value(hasItem(DEFAULT_ACCOUNT_NUMBER)))
            .andExpect(jsonPath("$.[*].accountType").value(hasItem(DEFAULT_ACCOUNT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(sameNumber(DEFAULT_BALANCE))))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    void getAccountUser() throws Exception {
        // Initialize the database
        insertedAccountUser = accountUserRepository.saveAndFlush(accountUser);

        // Get the accountUser
        restAccountUserMockMvc
            .perform(get(ENTITY_API_URL_ID, accountUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(accountUser.getId().intValue()))
            .andExpect(jsonPath("$.accountNumber").value(DEFAULT_ACCOUNT_NUMBER))
            .andExpect(jsonPath("$.accountType").value(DEFAULT_ACCOUNT_TYPE.toString()))
            .andExpect(jsonPath("$.balance").value(sameNumber(DEFAULT_BALANCE)))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAccountUser() throws Exception {
        // Get the accountUser
        restAccountUserMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAccountUser() throws Exception {
        // Initialize the database
        insertedAccountUser = accountUserRepository.saveAndFlush(accountUser);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the accountUser
        AccountUser updatedAccountUser = accountUserRepository.findById(accountUser.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedAccountUser are not directly saved in db
        em.detach(updatedAccountUser);
        updatedAccountUser
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .accountType(UPDATED_ACCOUNT_TYPE)
            .balance(UPDATED_BALANCE)
            .creationDate(UPDATED_CREATION_DATE)
            .status(UPDATED_STATUS);
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(updatedAccountUser);

        restAccountUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, accountUserDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(accountUserDTO))
            )
            .andExpect(status().isOk());

        // Validate the AccountUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAccountUserToMatchAllProperties(updatedAccountUser);
    }

    @Test
    @Transactional
    void putNonExistingAccountUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        accountUser.setId(longCount.incrementAndGet());

        // Create the AccountUser
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, accountUserDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(accountUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAccountUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        accountUser.setId(longCount.incrementAndGet());

        // Create the AccountUser
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(accountUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAccountUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        accountUser.setId(longCount.incrementAndGet());

        // Create the AccountUser
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountUserMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(accountUserDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AccountUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAccountUserWithPatch() throws Exception {
        // Initialize the database
        insertedAccountUser = accountUserRepository.saveAndFlush(accountUser);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the accountUser using partial update
        AccountUser partialUpdatedAccountUser = new AccountUser();
        partialUpdatedAccountUser.setId(accountUser.getId());

        partialUpdatedAccountUser.balance(UPDATED_BALANCE);

        restAccountUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccountUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAccountUser))
            )
            .andExpect(status().isOk());

        // Validate the AccountUser in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAccountUserUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAccountUser, accountUser),
            getPersistedAccountUser(accountUser)
        );
    }

    @Test
    @Transactional
    void fullUpdateAccountUserWithPatch() throws Exception {
        // Initialize the database
        insertedAccountUser = accountUserRepository.saveAndFlush(accountUser);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the accountUser using partial update
        AccountUser partialUpdatedAccountUser = new AccountUser();
        partialUpdatedAccountUser.setId(accountUser.getId());

        partialUpdatedAccountUser
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .accountType(UPDATED_ACCOUNT_TYPE)
            .balance(UPDATED_BALANCE)
            .creationDate(UPDATED_CREATION_DATE)
            .status(UPDATED_STATUS);

        restAccountUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccountUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAccountUser))
            )
            .andExpect(status().isOk());

        // Validate the AccountUser in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAccountUserUpdatableFieldsEquals(partialUpdatedAccountUser, getPersistedAccountUser(partialUpdatedAccountUser));
    }

    @Test
    @Transactional
    void patchNonExistingAccountUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        accountUser.setId(longCount.incrementAndGet());

        // Create the AccountUser
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, accountUserDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(accountUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAccountUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        accountUser.setId(longCount.incrementAndGet());

        // Create the AccountUser
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(accountUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAccountUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        accountUser.setId(longCount.incrementAndGet());

        // Create the AccountUser
        AccountUserDTO accountUserDTO = accountUserMapper.toDto(accountUser);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountUserMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(accountUserDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AccountUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAccountUser() throws Exception {
        // Initialize the database
        insertedAccountUser = accountUserRepository.saveAndFlush(accountUser);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the accountUser
        restAccountUserMockMvc
            .perform(delete(ENTITY_API_URL_ID, accountUser.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return accountUserRepository.count();
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

    protected AccountUser getPersistedAccountUser(AccountUser accountUser) {
        return accountUserRepository.findById(accountUser.getId()).orElseThrow();
    }

    protected void assertPersistedAccountUserToMatchAllProperties(AccountUser expectedAccountUser) {
        assertAccountUserAllPropertiesEquals(expectedAccountUser, getPersistedAccountUser(expectedAccountUser));
    }

    protected void assertPersistedAccountUserToMatchUpdatableProperties(AccountUser expectedAccountUser) {
        assertAccountUserAllUpdatablePropertiesEquals(expectedAccountUser, getPersistedAccountUser(expectedAccountUser));
    }
}
