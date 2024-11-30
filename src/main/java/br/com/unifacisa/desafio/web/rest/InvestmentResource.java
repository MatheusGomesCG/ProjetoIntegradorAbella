package br.com.unifacisa.desafio.web.rest;

import br.com.unifacisa.desafio.repository.InvestmentRepository;
import br.com.unifacisa.desafio.service.InvestmentService;
import br.com.unifacisa.desafio.service.dto.InvestmentDTO;
import br.com.unifacisa.desafio.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link br.com.unifacisa.desafio.domain.Investment}.
 */
@RestController
@RequestMapping("/api/investments")
public class InvestmentResource {

    private static final Logger LOG = LoggerFactory.getLogger(InvestmentResource.class);

    private static final String ENTITY_NAME = "investment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InvestmentService investmentService;

    private final InvestmentRepository investmentRepository;

    public InvestmentResource(InvestmentService investmentService, InvestmentRepository investmentRepository) {
        this.investmentService = investmentService;
        this.investmentRepository = investmentRepository;
    }

    /**
     * {@code POST  /investments} : Create a new investment.
     *
     * @param investmentDTO the investmentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new investmentDTO, or with status {@code 400 (Bad Request)} if the investment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<InvestmentDTO> createInvestment(@Valid @RequestBody InvestmentDTO investmentDTO) throws URISyntaxException {
        LOG.debug("REST request to save Investment : {}", investmentDTO);
        if (investmentDTO.getId() != null) {
            throw new BadRequestAlertException("A new investment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        investmentDTO = investmentService.save(investmentDTO);
        return ResponseEntity.created(new URI("/api/investments/" + investmentDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, investmentDTO.getId().toString()))
            .body(investmentDTO);
    }

    /**
     * {@code PUT  /investments/:id} : Updates an existing investment.
     *
     * @param id the id of the investmentDTO to save.
     * @param investmentDTO the investmentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated investmentDTO,
     * or with status {@code 400 (Bad Request)} if the investmentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the investmentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<InvestmentDTO> updateInvestment(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody InvestmentDTO investmentDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update Investment : {}, {}", id, investmentDTO);
        if (investmentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, investmentDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!investmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        investmentDTO = investmentService.update(investmentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, investmentDTO.getId().toString()))
            .body(investmentDTO);
    }

    /**
     * {@code PATCH  /investments/:id} : Partial updates given fields of an existing investment, field will ignore if it is null
     *
     * @param id the id of the investmentDTO to save.
     * @param investmentDTO the investmentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated investmentDTO,
     * or with status {@code 400 (Bad Request)} if the investmentDTO is not valid,
     * or with status {@code 404 (Not Found)} if the investmentDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the investmentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<InvestmentDTO> partialUpdateInvestment(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody InvestmentDTO investmentDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Investment partially : {}, {}", id, investmentDTO);
        if (investmentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, investmentDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!investmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InvestmentDTO> result = investmentService.partialUpdate(investmentDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, investmentDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /investments} : get all the investments.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of investments in body.
     */
    @GetMapping("")
    public ResponseEntity<List<InvestmentDTO>> getAllInvestments(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of Investments");
        Page<InvestmentDTO> page = investmentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /investments/:id} : get the "id" investment.
     *
     * @param id the id of the investmentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the investmentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<InvestmentDTO> getInvestment(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Investment : {}", id);
        Optional<InvestmentDTO> investmentDTO = investmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(investmentDTO);
    }

    /**
     * {@code DELETE  /investments/:id} : delete the "id" investment.
     *
     * @param id the id of the investmentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvestment(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Investment : {}", id);
        investmentService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
