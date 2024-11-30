package br.com.unifacisa.desafio.service.mapper;

import static br.com.unifacisa.desafio.domain.JobHistoryAsserts.*;
import static br.com.unifacisa.desafio.domain.JobHistoryTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class JobHistoryMapperTest {

    private JobHistoryMapper jobHistoryMapper;

    @BeforeEach
    void setUp() {
        jobHistoryMapper = new JobHistoryMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getJobHistorySample1();
        var actual = jobHistoryMapper.toEntity(jobHistoryMapper.toDto(expected));
        assertJobHistoryAllPropertiesEquals(expected, actual);
    }
}
