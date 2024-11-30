package br.com.unifacisa.desafio.service;

import br.com.unifacisa.desafio.service.dto.InvestmentDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link br.com.unifacisa.desafio.domain.Investment}.
 */
public interface InvestmentService {
    /**
     * Save a investment.
     *
     * @param investmentDTO the entity to save.
     * @return the persisted entity.
     */
    InvestmentDTO save(InvestmentDTO investmentDTO);

    /**
     * Updates a investment.
     *
     * @param investmentDTO the entity to update.
     * @return the persisted entity.
     */
    InvestmentDTO update(InvestmentDTO investmentDTO);

    /**
     * Partially updates a investment.
     *
     * @param investmentDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<InvestmentDTO> partialUpdate(InvestmentDTO investmentDTO);

    /**
     * Get all the investments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<InvestmentDTO> findAll(Pageable pageable);

    /**
     * Get the "id" investment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InvestmentDTO> findOne(Long id);

    /**
     * Delete the "id" investment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
