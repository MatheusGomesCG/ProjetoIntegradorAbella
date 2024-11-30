package br.com.unifacisa.desafio.service.dto;

import br.com.unifacisa.desafio.domain.enumeration.AccountStatus;
import br.com.unifacisa.desafio.domain.enumeration.AccountType;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link br.com.unifacisa.desafio.domain.AccountUser} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AccountUserDTO implements Serializable {

    private Long id;

    @NotNull
    private String accountNumber;

    @NotNull
    private AccountType accountType;

    @NotNull
    private BigDecimal balance;

    @NotNull
    private Instant creationDate;

    @NotNull
    private AccountStatus status;

    private EmployeeDTO owner;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }

    public EmployeeDTO getOwner() {
        return owner;
    }

    public void setOwner(EmployeeDTO owner) {
        this.owner = owner;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AccountUserDTO)) {
            return false;
        }

        AccountUserDTO accountUserDTO = (AccountUserDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, accountUserDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AccountUserDTO{" +
            "id=" + getId() +
            ", accountNumber='" + getAccountNumber() + "'" +
            ", accountType='" + getAccountType() + "'" +
            ", balance=" + getBalance() +
            ", creationDate='" + getCreationDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", owner=" + getOwner() +
            "}";
    }
}
