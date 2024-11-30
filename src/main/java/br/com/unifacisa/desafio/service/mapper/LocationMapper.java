package br.com.unifacisa.desafio.service.mapper;

import br.com.unifacisa.desafio.domain.Country;
import br.com.unifacisa.desafio.domain.Location;
import br.com.unifacisa.desafio.service.dto.CountryDTO;
import br.com.unifacisa.desafio.service.dto.LocationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Location} and its DTO {@link LocationDTO}.
 */
@Mapper(componentModel = "spring")
public interface LocationMapper extends EntityMapper<LocationDTO, Location> {
    @Mapping(target = "country", source = "country", qualifiedByName = "countryId")
    LocationDTO toDto(Location s);

    @Named("countryId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CountryDTO toDtoCountryId(Country country);
}
