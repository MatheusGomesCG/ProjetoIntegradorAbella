package br.com.unifacisa.desafio.service.mapper;

import br.com.unifacisa.desafio.domain.Country;
import br.com.unifacisa.desafio.domain.Region;
import br.com.unifacisa.desafio.service.dto.CountryDTO;
import br.com.unifacisa.desafio.service.dto.RegionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Country} and its DTO {@link CountryDTO}.
 */
@Mapper(componentModel = "spring")
public interface CountryMapper extends EntityMapper<CountryDTO, Country> {
    @Mapping(target = "region", source = "region", qualifiedByName = "regionId")
    CountryDTO toDto(Country s);

    @Named("regionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    RegionDTO toDtoRegionId(Region region);
}
