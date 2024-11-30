package br.com.unifacisa.desafio.domain;

import static br.com.unifacisa.desafio.domain.AccountUserTestSamples.*;
import static br.com.unifacisa.desafio.domain.TransactionTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.com.unifacisa.desafio.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TransactionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transaction.class);
        Transaction transaction1 = getTransactionSample1();
        Transaction transaction2 = new Transaction();
        assertThat(transaction1).isNotEqualTo(transaction2);

        transaction2.setId(transaction1.getId());
        assertThat(transaction1).isEqualTo(transaction2);

        transaction2 = getTransactionSample2();
        assertThat(transaction1).isNotEqualTo(transaction2);
    }

    @Test
    void accountTest() {
        Transaction transaction = getTransactionRandomSampleGenerator();
        AccountUser accountUserBack = getAccountUserRandomSampleGenerator();

        transaction.setAccount(accountUserBack);
        assertThat(transaction.getAccount()).isEqualTo(accountUserBack);

        transaction.account(null);
        assertThat(transaction.getAccount()).isNull();
    }
}
