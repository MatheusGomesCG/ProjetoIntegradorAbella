package br.com.unifacisa.desafio.service.mapper;

import br.com.unifacisa.desafio.domain.AccountUser;
import br.com.unifacisa.desafio.domain.Transaction;
import br.com.unifacisa.desafio.service.dto.AccountUserDTO;
import br.com.unifacisa.desafio.service.dto.TransactionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Transaction} and its DTO {@link TransactionDTO}.
 */
@Mapper(componentModel = "spring")
public interface TransactionMapper extends EntityMapper<TransactionDTO, Transaction> {
    @Mapping(target = "account", source = "account", qualifiedByName = "accountUserId")
    TransactionDTO toDto(Transaction s);

    @Named("accountUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AccountUserDTO toDtoAccountUserId(AccountUser accountUser);
}
