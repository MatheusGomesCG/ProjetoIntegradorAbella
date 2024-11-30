package br.com.unifacisa.desafio.service.mapper;

import static br.com.unifacisa.desafio.domain.JobAsserts.*;
import static br.com.unifacisa.desafio.domain.JobTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class JobMapperTest {

    private JobMapper jobMapper;

    @BeforeEach
    void setUp() {
        jobMapper = new JobMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getJobSample1();
        var actual = jobMapper.toEntity(jobMapper.toDto(expected));
        assertJobAllPropertiesEquals(expected, actual);
    }
}
