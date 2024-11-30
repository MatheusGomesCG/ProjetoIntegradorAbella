package br.com.unifacisa.desafio.service.mapper;

import static br.com.unifacisa.desafio.domain.AccountUserAsserts.*;
import static br.com.unifacisa.desafio.domain.AccountUserTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AccountUserMapperTest {

    private AccountUserMapper accountUserMapper;

    @BeforeEach
    void setUp() {
        accountUserMapper = new AccountUserMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAccountUserSample1();
        var actual = accountUserMapper.toEntity(accountUserMapper.toDto(expected));
        assertAccountUserAllPropertiesEquals(expected, actual);
    }
}
