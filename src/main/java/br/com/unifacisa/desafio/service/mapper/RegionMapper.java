package br.com.unifacisa.desafio.service.mapper;

import br.com.unifacisa.desafio.domain.Region;
import br.com.unifacisa.desafio.service.dto.RegionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Region} and its DTO {@link RegionDTO}.
 */
@Mapper(componentModel = "spring")
public interface RegionMapper extends EntityMapper<RegionDTO, Region> {}
