package br.com.unifacisa.desafio.domain;

import static br.com.unifacisa.desafio.domain.AccountUserTestSamples.*;
import static br.com.unifacisa.desafio.domain.EmployeeTestSamples.*;
import static br.com.unifacisa.desafio.domain.InvestmentTestSamples.*;
import static br.com.unifacisa.desafio.domain.TransactionTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.com.unifacisa.desafio.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class AccountUserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountUser.class);
        AccountUser accountUser1 = getAccountUserSample1();
        AccountUser accountUser2 = new AccountUser();
        assertThat(accountUser1).isNotEqualTo(accountUser2);

        accountUser2.setId(accountUser1.getId());
        assertThat(accountUser1).isEqualTo(accountUser2);

        accountUser2 = getAccountUserSample2();
        assertThat(accountUser1).isNotEqualTo(accountUser2);
    }

    @Test
    void transactionTest() {
        AccountUser accountUser = getAccountUserRandomSampleGenerator();
        Transaction transactionBack = getTransactionRandomSampleGenerator();

        accountUser.addTransaction(transactionBack);
        assertThat(accountUser.getTransactions()).containsOnly(transactionBack);
        assertThat(transactionBack.getAccount()).isEqualTo(accountUser);

        accountUser.removeTransaction(transactionBack);
        assertThat(accountUser.getTransactions()).doesNotContain(transactionBack);
        assertThat(transactionBack.getAccount()).isNull();

        accountUser.transactions(new HashSet<>(Set.of(transactionBack)));
        assertThat(accountUser.getTransactions()).containsOnly(transactionBack);
        assertThat(transactionBack.getAccount()).isEqualTo(accountUser);

        accountUser.setTransactions(new HashSet<>());
        assertThat(accountUser.getTransactions()).doesNotContain(transactionBack);
        assertThat(transactionBack.getAccount()).isNull();
    }

    @Test
    void investmentTest() {
        AccountUser accountUser = getAccountUserRandomSampleGenerator();
        Investment investmentBack = getInvestmentRandomSampleGenerator();

        accountUser.addInvestment(investmentBack);
        assertThat(accountUser.getInvestments()).containsOnly(investmentBack);
        assertThat(investmentBack.getAccount()).isEqualTo(accountUser);

        accountUser.removeInvestment(investmentBack);
        assertThat(accountUser.getInvestments()).doesNotContain(investmentBack);
        assertThat(investmentBack.getAccount()).isNull();

        accountUser.investments(new HashSet<>(Set.of(investmentBack)));
        assertThat(accountUser.getInvestments()).containsOnly(investmentBack);
        assertThat(investmentBack.getAccount()).isEqualTo(accountUser);

        accountUser.setInvestments(new HashSet<>());
        assertThat(accountUser.getInvestments()).doesNotContain(investmentBack);
        assertThat(investmentBack.getAccount()).isNull();
    }

    @Test
    void ownerTest() {
        AccountUser accountUser = getAccountUserRandomSampleGenerator();
        Employee employeeBack = getEmployeeRandomSampleGenerator();

        accountUser.setOwner(employeeBack);
        assertThat(accountUser.getOwner()).isEqualTo(employeeBack);

        accountUser.owner(null);
        assertThat(accountUser.getOwner()).isNull();
    }
}
