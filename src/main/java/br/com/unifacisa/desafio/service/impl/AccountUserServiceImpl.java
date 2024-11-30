package br.com.unifacisa.desafio.service.impl;

import br.com.unifacisa.desafio.domain.AccountUser;
import br.com.unifacisa.desafio.repository.AccountUserRepository;
import br.com.unifacisa.desafio.service.AccountUserService;
import br.com.unifacisa.desafio.service.dto.AccountUserDTO;
import br.com.unifacisa.desafio.service.mapper.AccountUserMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link br.com.unifacisa.desafio.domain.AccountUser}.
 */
@Service
@Transactional
public class AccountUserServiceImpl implements AccountUserService {

    private static final Logger LOG = LoggerFactory.getLogger(AccountUserServiceImpl.class);

    private final AccountUserRepository accountUserRepository;

    private final AccountUserMapper accountUserMapper;

    public AccountUserServiceImpl(AccountUserRepository accountUserRepository, AccountUserMapper accountUserMapper) {
        this.accountUserRepository = accountUserRepository;
        this.accountUserMapper = accountUserMapper;
    }

    @Override
    public AccountUserDTO save(AccountUserDTO accountUserDTO) {
        LOG.debug("Request to save AccountUser : {}", accountUserDTO);
        AccountUser accountUser = accountUserMapper.toEntity(accountUserDTO);
        accountUser = accountUserRepository.save(accountUser);
        return accountUserMapper.toDto(accountUser);
    }

    @Override
    public AccountUserDTO update(AccountUserDTO accountUserDTO) {
        LOG.debug("Request to update AccountUser : {}", accountUserDTO);
        AccountUser accountUser = accountUserMapper.toEntity(accountUserDTO);
        accountUser = accountUserRepository.save(accountUser);
        return accountUserMapper.toDto(accountUser);
    }

    @Override
    public Optional<AccountUserDTO> partialUpdate(AccountUserDTO accountUserDTO) {
        LOG.debug("Request to partially update AccountUser : {}", accountUserDTO);

        return accountUserRepository
            .findById(accountUserDTO.getId())
            .map(existingAccountUser -> {
                accountUserMapper.partialUpdate(existingAccountUser, accountUserDTO);

                return existingAccountUser;
            })
            .map(accountUserRepository::save)
            .map(accountUserMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AccountUserDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all AccountUsers");
        return accountUserRepository.findAll(pageable).map(accountUserMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AccountUserDTO> findOne(Long id) {
        LOG.debug("Request to get AccountUser : {}", id);
        return accountUserRepository.findById(id).map(accountUserMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete AccountUser : {}", id);
        accountUserRepository.deleteById(id);
    }
}
