package br.com.unifacisa.desafio.domain;

import static br.com.unifacisa.desafio.domain.AccountUserTestSamples.*;
import static br.com.unifacisa.desafio.domain.InvestmentTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.com.unifacisa.desafio.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class InvestmentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Investment.class);
        Investment investment1 = getInvestmentSample1();
        Investment investment2 = new Investment();
        assertThat(investment1).isNotEqualTo(investment2);

        investment2.setId(investment1.getId());
        assertThat(investment1).isEqualTo(investment2);

        investment2 = getInvestmentSample2();
        assertThat(investment1).isNotEqualTo(investment2);
    }

    @Test
    void accountTest() {
        Investment investment = getInvestmentRandomSampleGenerator();
        AccountUser accountUserBack = getAccountUserRandomSampleGenerator();

        investment.setAccount(accountUserBack);
        assertThat(investment.getAccount()).isEqualTo(accountUserBack);

        investment.account(null);
        assertThat(investment.getAccount()).isNull();
    }
}
