package br.com.unifacisa.desafio.domain;

import br.com.unifacisa.desafio.domain.enumeration.InvestmentType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Investment.
 */
@Entity
@Table(name = "investment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Investment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "investment_name", nullable = false)
    private String investmentName;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "investment_type", nullable = false)
    private InvestmentType investmentType;

    @NotNull
    @Column(name = "amount", precision = 21, scale = 2, nullable = false)
    private BigDecimal amount;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "transactions", "investments", "owner" }, allowSetters = true)
    private AccountUser account;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Investment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInvestmentName() {
        return this.investmentName;
    }

    public Investment investmentName(String investmentName) {
        this.setInvestmentName(investmentName);
        return this;
    }

    public void setInvestmentName(String investmentName) {
        this.investmentName = investmentName;
    }

    public InvestmentType getInvestmentType() {
        return this.investmentType;
    }

    public Investment investmentType(InvestmentType investmentType) {
        this.setInvestmentType(investmentType);
        return this;
    }

    public void setInvestmentType(InvestmentType investmentType) {
        this.investmentType = investmentType;
    }

    public BigDecimal getAmount() {
        return this.amount;
    }

    public Investment amount(BigDecimal amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Instant getStartDate() {
        return this.startDate;
    }

    public Investment startDate(Instant startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return this.endDate;
    }

    public Investment endDate(Instant endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public AccountUser getAccount() {
        return this.account;
    }

    public void setAccount(AccountUser accountUser) {
        this.account = accountUser;
    }

    public Investment account(AccountUser accountUser) {
        this.setAccount(accountUser);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Investment)) {
            return false;
        }
        return getId() != null && getId().equals(((Investment) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Investment{" +
            "id=" + getId() +
            ", investmentName='" + getInvestmentName() + "'" +
            ", investmentType='" + getInvestmentType() + "'" +
            ", amount=" + getAmount() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
