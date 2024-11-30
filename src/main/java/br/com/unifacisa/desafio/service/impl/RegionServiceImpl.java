package br.com.unifacisa.desafio.service.impl;

import br.com.unifacisa.desafio.domain.Region;
import br.com.unifacisa.desafio.repository.RegionRepository;
import br.com.unifacisa.desafio.service.RegionService;
import br.com.unifacisa.desafio.service.dto.RegionDTO;
import br.com.unifacisa.desafio.service.mapper.RegionMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link br.com.unifacisa.desafio.domain.Region}.
 */
@Service
@Transactional
public class RegionServiceImpl implements RegionService {

    private static final Logger LOG = LoggerFactory.getLogger(RegionServiceImpl.class);

    private final RegionRepository regionRepository;

    private final RegionMapper regionMapper;

    public RegionServiceImpl(RegionRepository regionRepository, RegionMapper regionMapper) {
        this.regionRepository = regionRepository;
        this.regionMapper = regionMapper;
    }

    @Override
    public RegionDTO save(RegionDTO regionDTO) {
        LOG.debug("Request to save Region : {}", regionDTO);
        Region region = regionMapper.toEntity(regionDTO);
        region = regionRepository.save(region);
        return regionMapper.toDto(region);
    }

    @Override
    public RegionDTO update(RegionDTO regionDTO) {
        LOG.debug("Request to update Region : {}", regionDTO);
        Region region = regionMapper.toEntity(regionDTO);
        region = regionRepository.save(region);
        return regionMapper.toDto(region);
    }

    @Override
    public Optional<RegionDTO> partialUpdate(RegionDTO regionDTO) {
        LOG.debug("Request to partially update Region : {}", regionDTO);

        return regionRepository
            .findById(regionDTO.getId())
            .map(existingRegion -> {
                regionMapper.partialUpdate(existingRegion, regionDTO);

                return existingRegion;
            })
            .map(regionRepository::save)
            .map(regionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RegionDTO> findAll() {
        LOG.debug("Request to get all Regions");
        return regionRepository.findAll().stream().map(regionMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get all the regions where Country is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<RegionDTO> findAllWhereCountryIsNull() {
        LOG.debug("Request to get all regions where Country is null");
        return StreamSupport.stream(regionRepository.findAll().spliterator(), false)
            .filter(region -> region.getCountry() == null)
            .map(regionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RegionDTO> findOne(Long id) {
        LOG.debug("Request to get Region : {}", id);
        return regionRepository.findById(id).map(regionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Region : {}", id);
        regionRepository.deleteById(id);
    }
}
