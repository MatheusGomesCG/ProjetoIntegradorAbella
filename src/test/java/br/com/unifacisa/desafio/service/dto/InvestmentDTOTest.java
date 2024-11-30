package br.com.unifacisa.desafio.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.unifacisa.desafio.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class InvestmentDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvestmentDTO.class);
        InvestmentDTO investmentDTO1 = new InvestmentDTO();
        investmentDTO1.setId(1L);
        InvestmentDTO investmentDTO2 = new InvestmentDTO();
        assertThat(investmentDTO1).isNotEqualTo(investmentDTO2);
        investmentDTO2.setId(investmentDTO1.getId());
        assertThat(investmentDTO1).isEqualTo(investmentDTO2);
        investmentDTO2.setId(2L);
        assertThat(investmentDTO1).isNotEqualTo(investmentDTO2);
        investmentDTO1.setId(null);
        assertThat(investmentDTO1).isNotEqualTo(investmentDTO2);
    }
}
