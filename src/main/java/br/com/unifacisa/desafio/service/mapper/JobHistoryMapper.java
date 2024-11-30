package br.com.unifacisa.desafio.service.mapper;

import br.com.unifacisa.desafio.domain.Department;
import br.com.unifacisa.desafio.domain.Employee;
import br.com.unifacisa.desafio.domain.Job;
import br.com.unifacisa.desafio.domain.JobHistory;
import br.com.unifacisa.desafio.service.dto.DepartmentDTO;
import br.com.unifacisa.desafio.service.dto.EmployeeDTO;
import br.com.unifacisa.desafio.service.dto.JobDTO;
import br.com.unifacisa.desafio.service.dto.JobHistoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link JobHistory} and its DTO {@link JobHistoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface JobHistoryMapper extends EntityMapper<JobHistoryDTO, JobHistory> {
    @Mapping(target = "job", source = "job", qualifiedByName = "jobId")
    @Mapping(target = "department", source = "department", qualifiedByName = "departmentId")
    @Mapping(target = "employee", source = "employee", qualifiedByName = "employeeId")
    JobHistoryDTO toDto(JobHistory s);

    @Named("jobId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    JobDTO toDtoJobId(Job job);

    @Named("departmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DepartmentDTO toDtoDepartmentId(Department department);

    @Named("employeeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EmployeeDTO toDtoEmployeeId(Employee employee);
}
