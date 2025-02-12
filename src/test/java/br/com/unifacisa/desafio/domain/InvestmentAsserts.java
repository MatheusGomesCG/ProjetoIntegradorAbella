package br.com.unifacisa.desafio.domain;

import static br.com.unifacisa.desafio.domain.AssertUtils.bigDecimalCompareTo;
import static org.assertj.core.api.Assertions.assertThat;

public class InvestmentAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertInvestmentAllPropertiesEquals(Investment expected, Investment actual) {
        assertInvestmentAutoGeneratedPropertiesEquals(expected, actual);
        assertInvestmentAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertInvestmentAllUpdatablePropertiesEquals(Investment expected, Investment actual) {
        assertInvestmentUpdatableFieldsEquals(expected, actual);
        assertInvestmentUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertInvestmentAutoGeneratedPropertiesEquals(Investment expected, Investment actual) {
        assertThat(expected)
            .as("Verify Investment auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertInvestmentUpdatableFieldsEquals(Investment expected, Investment actual) {
        assertThat(expected)
            .as("Verify Investment relevant properties")
            .satisfies(e -> assertThat(e.getInvestmentName()).as("check investmentName").isEqualTo(actual.getInvestmentName()))
            .satisfies(e -> assertThat(e.getInvestmentType()).as("check investmentType").isEqualTo(actual.getInvestmentType()))
            .satisfies(e -> assertThat(e.getAmount()).as("check amount").usingComparator(bigDecimalCompareTo).isEqualTo(actual.getAmount()))
            .satisfies(e -> assertThat(e.getStartDate()).as("check startDate").isEqualTo(actual.getStartDate()))
            .satisfies(e -> assertThat(e.getEndDate()).as("check endDate").isEqualTo(actual.getEndDate()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertInvestmentUpdatableRelationshipsEquals(Investment expected, Investment actual) {
        assertThat(expected)
            .as("Verify Investment relationships")
            .satisfies(e -> assertThat(e.getAccount()).as("check account").isEqualTo(actual.getAccount()));
    }
}
