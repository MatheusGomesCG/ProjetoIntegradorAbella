package br.com.unifacisa.desafio.service.mapper;

import br.com.unifacisa.desafio.domain.Department;
import br.com.unifacisa.desafio.domain.Location;
import br.com.unifacisa.desafio.service.dto.DepartmentDTO;
import br.com.unifacisa.desafio.service.dto.LocationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Department} and its DTO {@link DepartmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface DepartmentMapper extends EntityMapper<DepartmentDTO, Department> {
    @Mapping(target = "location", source = "location", qualifiedByName = "locationId")
    DepartmentDTO toDto(Department s);

    @Named("locationId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LocationDTO toDtoLocationId(Location location);
}
