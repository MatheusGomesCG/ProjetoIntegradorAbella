package br.com.unifacisa.desafio.service;

import br.com.unifacisa.desafio.domain.Employee;
import br.com.unifacisa.desafio.repository.EmployeeRepository;
import br.com.unifacisa.desafio.service.dto.EmployeeDTO;
import br.com.unifacisa.desafio.service.mapper.EmployeeMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link br.com.unifacisa.desafio.domain.Employee}.
 */
@Service
@Transactional
public class EmployeeService {

    private static final Logger LOG = LoggerFactory.getLogger(EmployeeService.class);

    private final EmployeeRepository employeeRepository;

    private final EmployeeMapper employeeMapper;

    public EmployeeService(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
    }

    /**
     * Save a employee.
     *
     * @param employeeDTO the entity to save.
     * @return the persisted entity.
     */
    public EmployeeDTO save(EmployeeDTO employeeDTO) {
        LOG.debug("Request to save Employee : {}", employeeDTO);
        Employee employee = employeeMapper.toEntity(employeeDTO);
        employee = employeeRepository.save(employee);
        return employeeMapper.toDto(employee);
    }

    /**
     * Update a employee.
     *
     * @param employeeDTO the entity to save.
     * @return the persisted entity.
     */
    public EmployeeDTO update(EmployeeDTO employeeDTO) {
        LOG.debug("Request to update Employee : {}", employeeDTO);
        Employee employee = employeeMapper.toEntity(employeeDTO);
        employee = employeeRepository.save(employee);
        return employeeMapper.toDto(employee);
    }

    /**
     * Partially update a employee.
     *
     * @param employeeDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<EmployeeDTO> partialUpdate(EmployeeDTO employeeDTO) {
        LOG.debug("Request to partially update Employee : {}", employeeDTO);

        return employeeRepository
            .findById(employeeDTO.getId())
            .map(existingEmployee -> {
                employeeMapper.partialUpdate(existingEmployee, employeeDTO);

                return existingEmployee;
            })
            .map(employeeRepository::save)
            .map(employeeMapper::toDto);
    }

    /**
     * Get all the employees.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<EmployeeDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Employees");
        return employeeRepository.findAll(pageable).map(employeeMapper::toDto);
    }

    /**
     *  Get all the employees where JobHistory is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<EmployeeDTO> findAllWhereJobHistoryIsNull() {
        LOG.debug("Request to get all employees where JobHistory is null");
        return StreamSupport.stream(employeeRepository.findAll().spliterator(), false)
            .filter(employee -> employee.getJobHistory() == null)
            .map(employeeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one employee by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EmployeeDTO> findOne(Long id) {
        LOG.debug("Request to get Employee : {}", id);
        return employeeRepository.findById(id).map(employeeMapper::toDto);
    }

    /**
     * Delete the employee by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Employee : {}", id);
        employeeRepository.deleteById(id);
    }
}
