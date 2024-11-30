package br.com.unifacisa.desafio.domain;

import static br.com.unifacisa.desafio.domain.AccountUserTestSamples.*;
import static br.com.unifacisa.desafio.domain.DepartmentTestSamples.*;
import static br.com.unifacisa.desafio.domain.EmployeeTestSamples.*;
import static br.com.unifacisa.desafio.domain.EmployeeTestSamples.*;
import static br.com.unifacisa.desafio.domain.JobHistoryTestSamples.*;
import static br.com.unifacisa.desafio.domain.JobTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.com.unifacisa.desafio.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class EmployeeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Employee.class);
        Employee employee1 = getEmployeeSample1();
        Employee employee2 = new Employee();
        assertThat(employee1).isNotEqualTo(employee2);

        employee2.setId(employee1.getId());
        assertThat(employee1).isEqualTo(employee2);

        employee2 = getEmployeeSample2();
        assertThat(employee1).isNotEqualTo(employee2);
    }

    @Test
    void jobTest() {
        Employee employee = getEmployeeRandomSampleGenerator();
        Job jobBack = getJobRandomSampleGenerator();

        employee.addJob(jobBack);
        assertThat(employee.getJobs()).containsOnly(jobBack);
        assertThat(jobBack.getEmployee()).isEqualTo(employee);

        employee.removeJob(jobBack);
        assertThat(employee.getJobs()).doesNotContain(jobBack);
        assertThat(jobBack.getEmployee()).isNull();

        employee.jobs(new HashSet<>(Set.of(jobBack)));
        assertThat(employee.getJobs()).containsOnly(jobBack);
        assertThat(jobBack.getEmployee()).isEqualTo(employee);

        employee.setJobs(new HashSet<>());
        assertThat(employee.getJobs()).doesNotContain(jobBack);
        assertThat(jobBack.getEmployee()).isNull();
    }

    @Test
    void accountTest() {
        Employee employee = getEmployeeRandomSampleGenerator();
        AccountUser accountUserBack = getAccountUserRandomSampleGenerator();

        employee.addAccount(accountUserBack);
        assertThat(employee.getAccounts()).containsOnly(accountUserBack);
        assertThat(accountUserBack.getOwner()).isEqualTo(employee);

        employee.removeAccount(accountUserBack);
        assertThat(employee.getAccounts()).doesNotContain(accountUserBack);
        assertThat(accountUserBack.getOwner()).isNull();

        employee.accounts(new HashSet<>(Set.of(accountUserBack)));
        assertThat(employee.getAccounts()).containsOnly(accountUserBack);
        assertThat(accountUserBack.getOwner()).isEqualTo(employee);

        employee.setAccounts(new HashSet<>());
        assertThat(employee.getAccounts()).doesNotContain(accountUserBack);
        assertThat(accountUserBack.getOwner()).isNull();
    }

    @Test
    void managerTest() {
        Employee employee = getEmployeeRandomSampleGenerator();
        Employee employeeBack = getEmployeeRandomSampleGenerator();

        employee.setManager(employeeBack);
        assertThat(employee.getManager()).isEqualTo(employeeBack);

        employee.manager(null);
        assertThat(employee.getManager()).isNull();
    }

    @Test
    void departmentTest() {
        Employee employee = getEmployeeRandomSampleGenerator();
        Department departmentBack = getDepartmentRandomSampleGenerator();

        employee.setDepartment(departmentBack);
        assertThat(employee.getDepartment()).isEqualTo(departmentBack);

        employee.department(null);
        assertThat(employee.getDepartment()).isNull();
    }

    @Test
    void jobHistoryTest() {
        Employee employee = getEmployeeRandomSampleGenerator();
        JobHistory jobHistoryBack = getJobHistoryRandomSampleGenerator();

        employee.setJobHistory(jobHistoryBack);
        assertThat(employee.getJobHistory()).isEqualTo(jobHistoryBack);
        assertThat(jobHistoryBack.getEmployee()).isEqualTo(employee);

        employee.jobHistory(null);
        assertThat(employee.getJobHistory()).isNull();
        assertThat(jobHistoryBack.getEmployee()).isNull();
    }
}
