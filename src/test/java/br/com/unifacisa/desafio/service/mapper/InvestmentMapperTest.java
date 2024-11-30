package br.com.unifacisa.desafio.service.mapper;

import static br.com.unifacisa.desafio.domain.InvestmentAsserts.*;
import static br.com.unifacisa.desafio.domain.InvestmentTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class InvestmentMapperTest {

    private InvestmentMapper investmentMapper;

    @BeforeEach
    void setUp() {
        investmentMapper = new InvestmentMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getInvestmentSample1();
        var actual = investmentMapper.toEntity(investmentMapper.toDto(expected));
        assertInvestmentAllPropertiesEquals(expected, actual);
    }
}
