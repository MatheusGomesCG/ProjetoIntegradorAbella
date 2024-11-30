package br.com.unifacisa.desafio.service.mapper;

import br.com.unifacisa.desafio.domain.AccountUser;
import br.com.unifacisa.desafio.domain.Employee;
import br.com.unifacisa.desafio.service.dto.AccountUserDTO;
import br.com.unifacisa.desafio.service.dto.EmployeeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AccountUser} and its DTO {@link AccountUserDTO}.
 */
@Mapper(componentModel = "spring")
public interface AccountUserMapper extends EntityMapper<AccountUserDTO, AccountUser> {
    @Mapping(target = "owner", source = "owner", qualifiedByName = "employeeId")
    AccountUserDTO toDto(AccountUser s);

    @Named("employeeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EmployeeDTO toDtoEmployeeId(Employee employee);
}
