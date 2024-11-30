package br.com.unifacisa.desafio.repository;

import br.com.unifacisa.desafio.domain.AccountUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AccountUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountUserRepository extends JpaRepository<AccountUser, Long> {}
