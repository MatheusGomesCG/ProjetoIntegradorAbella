package br.com.unifacisa.desafio.service.mapper;

import br.com.unifacisa.desafio.domain.AccountUser;
import br.com.unifacisa.desafio.domain.Investment;
import br.com.unifacisa.desafio.service.dto.AccountUserDTO;
import br.com.unifacisa.desafio.service.dto.InvestmentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Investment} and its DTO {@link InvestmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface InvestmentMapper extends EntityMapper<InvestmentDTO, Investment> {
    @Mapping(target = "account", source = "account", qualifiedByName = "accountUserId")
    InvestmentDTO toDto(Investment s);

    @Named("accountUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AccountUserDTO toDtoAccountUserId(AccountUser accountUser);
}
