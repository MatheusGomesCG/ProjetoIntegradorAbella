import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ILocationFinanceAppSuffix } from 'app/entities/location-finance-app-suffix/location-finance-app-suffix.model';
import { LocationFinanceAppSuffixService } from 'app/entities/location-finance-app-suffix/service/location-finance-app-suffix.service';
import { DepartmentFinanceAppSuffixService } from '../service/department-finance-app-suffix.service';
import { IDepartmentFinanceAppSuffix } from '../department-finance-app-suffix.model';
import { DepartmentFinanceAppSuffixFormService } from './department-finance-app-suffix-form.service';

import { DepartmentFinanceAppSuffixUpdateComponent } from './department-finance-app-suffix-update.component';

describe('DepartmentFinanceAppSuffix Management Update Component', () => {
  let comp: DepartmentFinanceAppSuffixUpdateComponent;
  let fixture: ComponentFixture<DepartmentFinanceAppSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let departmentFormService: DepartmentFinanceAppSuffixFormService;
  let departmentService: DepartmentFinanceAppSuffixService;
  let locationService: LocationFinanceAppSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DepartmentFinanceAppSuffixUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DepartmentFinanceAppSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DepartmentFinanceAppSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    departmentFormService = TestBed.inject(DepartmentFinanceAppSuffixFormService);
    departmentService = TestBed.inject(DepartmentFinanceAppSuffixService);
    locationService = TestBed.inject(LocationFinanceAppSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call location query and add missing value', () => {
      const department: IDepartmentFinanceAppSuffix = { id: 456 };
      const location: ILocationFinanceAppSuffix = { id: 25097 };
      department.location = location;

      const locationCollection: ILocationFinanceAppSuffix[] = [{ id: 25968 }];
      jest.spyOn(locationService, 'query').mockReturnValue(of(new HttpResponse({ body: locationCollection })));
      const expectedCollection: ILocationFinanceAppSuffix[] = [location, ...locationCollection];
      jest.spyOn(locationService, 'addLocationFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ department });
      comp.ngOnInit();

      expect(locationService.query).toHaveBeenCalled();
      expect(locationService.addLocationFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(locationCollection, location);
      expect(comp.locationsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const department: IDepartmentFinanceAppSuffix = { id: 456 };
      const location: ILocationFinanceAppSuffix = { id: 16626 };
      department.location = location;

      activatedRoute.data = of({ department });
      comp.ngOnInit();

      expect(comp.locationsCollection).toContain(location);
      expect(comp.department).toEqual(department);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDepartmentFinanceAppSuffix>>();
      const department = { id: 123 };
      jest.spyOn(departmentFormService, 'getDepartmentFinanceAppSuffix').mockReturnValue(department);
      jest.spyOn(departmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ department });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: department }));
      saveSubject.complete();

      // THEN
      expect(departmentFormService.getDepartmentFinanceAppSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(departmentService.update).toHaveBeenCalledWith(expect.objectContaining(department));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDepartmentFinanceAppSuffix>>();
      const department = { id: 123 };
      jest.spyOn(departmentFormService, 'getDepartmentFinanceAppSuffix').mockReturnValue({ id: null });
      jest.spyOn(departmentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ department: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: department }));
      saveSubject.complete();

      // THEN
      expect(departmentFormService.getDepartmentFinanceAppSuffix).toHaveBeenCalled();
      expect(departmentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDepartmentFinanceAppSuffix>>();
      const department = { id: 123 };
      jest.spyOn(departmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ department });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(departmentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareLocationFinanceAppSuffix', () => {
      it('Should forward to locationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(locationService, 'compareLocationFinanceAppSuffix');
        comp.compareLocationFinanceAppSuffix(entity, entity2);
        expect(locationService.compareLocationFinanceAppSuffix).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
