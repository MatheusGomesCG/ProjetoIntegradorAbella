package br.com.unifacisa.desafio.domain;

import br.com.unifacisa.desafio.domain.enumeration.AccountStatus;
import br.com.unifacisa.desafio.domain.enumeration.AccountType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AccountUser.
 */
@Entity
@Table(name = "account_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AccountUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "account_number", nullable = false)
    private String accountNumber;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "account_type", nullable = false)
    private AccountType accountType;

    @NotNull
    @Column(name = "balance", precision = 21, scale = 2, nullable = false)
    private BigDecimal balance;

    @NotNull
    @Column(name = "creation_date", nullable = false)
    private Instant creationDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private AccountStatus status;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "account")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "account" }, allowSetters = true)
    private Set<Transaction> transactions = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "account")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "account" }, allowSetters = true)
    private Set<Investment> investments = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "jobs", "accounts", "manager", "department", "jobHistory" }, allowSetters = true)
    private Employee owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AccountUser id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountNumber() {
        return this.accountNumber;
    }

    public AccountUser accountNumber(String accountNumber) {
        this.setAccountNumber(accountNumber);
        return this;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public AccountType getAccountType() {
        return this.accountType;
    }

    public AccountUser accountType(AccountType accountType) {
        this.setAccountType(accountType);
        return this;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public BigDecimal getBalance() {
        return this.balance;
    }

    public AccountUser balance(BigDecimal balance) {
        this.setBalance(balance);
        return this;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public Instant getCreationDate() {
        return this.creationDate;
    }

    public AccountUser creationDate(Instant creationDate) {
        this.setCreationDate(creationDate);
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public AccountStatus getStatus() {
        return this.status;
    }

    public AccountUser status(AccountStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }

    public Set<Transaction> getTransactions() {
        return this.transactions;
    }

    public void setTransactions(Set<Transaction> transactions) {
        if (this.transactions != null) {
            this.transactions.forEach(i -> i.setAccount(null));
        }
        if (transactions != null) {
            transactions.forEach(i -> i.setAccount(this));
        }
        this.transactions = transactions;
    }

    public AccountUser transactions(Set<Transaction> transactions) {
        this.setTransactions(transactions);
        return this;
    }

    public AccountUser addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.setAccount(this);
        return this;
    }

    public AccountUser removeTransaction(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.setAccount(null);
        return this;
    }

    public Set<Investment> getInvestments() {
        return this.investments;
    }

    public void setInvestments(Set<Investment> investments) {
        if (this.investments != null) {
            this.investments.forEach(i -> i.setAccount(null));
        }
        if (investments != null) {
            investments.forEach(i -> i.setAccount(this));
        }
        this.investments = investments;
    }

    public AccountUser investments(Set<Investment> investments) {
        this.setInvestments(investments);
        return this;
    }

    public AccountUser addInvestment(Investment investment) {
        this.investments.add(investment);
        investment.setAccount(this);
        return this;
    }

    public AccountUser removeInvestment(Investment investment) {
        this.investments.remove(investment);
        investment.setAccount(null);
        return this;
    }

    public Employee getOwner() {
        return this.owner;
    }

    public void setOwner(Employee employee) {
        this.owner = employee;
    }

    public AccountUser owner(Employee employee) {
        this.setOwner(employee);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AccountUser)) {
            return false;
        }
        return getId() != null && getId().equals(((AccountUser) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AccountUser{" +
            "id=" + getId() +
            ", accountNumber='" + getAccountNumber() + "'" +
            ", accountType='" + getAccountType() + "'" +
            ", balance=" + getBalance() +
            ", creationDate='" + getCreationDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
