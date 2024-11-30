package br.com.unifacisa.desafio.service.dto;

import br.com.unifacisa.desafio.domain.enumeration.InvestmentType;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link br.com.unifacisa.desafio.domain.Investment} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class InvestmentDTO implements Serializable {

    private Long id;

    @NotNull
    private String investmentName;

    @NotNull
    private InvestmentType investmentType;

    @NotNull
    private BigDecimal amount;

    @NotNull
    private Instant startDate;

    private Instant endDate;

    private AccountUserDTO account;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInvestmentName() {
        return investmentName;
    }

    public void setInvestmentName(String investmentName) {
        this.investmentName = investmentName;
    }

    public InvestmentType getInvestmentType() {
        return investmentType;
    }

    public void setInvestmentType(InvestmentType investmentType) {
        this.investmentType = investmentType;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public AccountUserDTO getAccount() {
        return account;
    }

    public void setAccount(AccountUserDTO account) {
        this.account = account;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InvestmentDTO)) {
            return false;
        }

        InvestmentDTO investmentDTO = (InvestmentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, investmentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InvestmentDTO{" +
            "id=" + getId() +
            ", investmentName='" + getInvestmentName() + "'" +
            ", investmentType='" + getInvestmentType() + "'" +
            ", amount=" + getAmount() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", account=" + getAccount() +
            "}";
    }
}
