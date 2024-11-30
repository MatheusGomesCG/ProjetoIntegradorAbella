package br.com.unifacisa.desafio.service.impl;

import br.com.unifacisa.desafio.domain.Investment;
import br.com.unifacisa.desafio.repository.InvestmentRepository;
import br.com.unifacisa.desafio.service.InvestmentService;
import br.com.unifacisa.desafio.service.dto.InvestmentDTO;
import br.com.unifacisa.desafio.service.mapper.InvestmentMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link br.com.unifacisa.desafio.domain.Investment}.
 */
@Service
@Transactional
public class InvestmentServiceImpl implements InvestmentService {

    private static final Logger LOG = LoggerFactory.getLogger(InvestmentServiceImpl.class);

    private final InvestmentRepository investmentRepository;

    private final InvestmentMapper investmentMapper;

    public InvestmentServiceImpl(InvestmentRepository investmentRepository, InvestmentMapper investmentMapper) {
        this.investmentRepository = investmentRepository;
        this.investmentMapper = investmentMapper;
    }

    @Override
    public InvestmentDTO save(InvestmentDTO investmentDTO) {
        LOG.debug("Request to save Investment : {}", investmentDTO);
        Investment investment = investmentMapper.toEntity(investmentDTO);
        investment = investmentRepository.save(investment);
        return investmentMapper.toDto(investment);
    }

    @Override
    public InvestmentDTO update(InvestmentDTO investmentDTO) {
        LOG.debug("Request to update Investment : {}", investmentDTO);
        Investment investment = investmentMapper.toEntity(investmentDTO);
        investment = investmentRepository.save(investment);
        return investmentMapper.toDto(investment);
    }

    @Override
    public Optional<InvestmentDTO> partialUpdate(InvestmentDTO investmentDTO) {
        LOG.debug("Request to partially update Investment : {}", investmentDTO);

        return investmentRepository
            .findById(investmentDTO.getId())
            .map(existingInvestment -> {
                investmentMapper.partialUpdate(existingInvestment, investmentDTO);

                return existingInvestment;
            })
            .map(investmentRepository::save)
            .map(investmentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<InvestmentDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Investments");
        return investmentRepository.findAll(pageable).map(investmentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InvestmentDTO> findOne(Long id) {
        LOG.debug("Request to get Investment : {}", id);
        return investmentRepository.findById(id).map(investmentMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Investment : {}", id);
        investmentRepository.deleteById(id);
    }
}
