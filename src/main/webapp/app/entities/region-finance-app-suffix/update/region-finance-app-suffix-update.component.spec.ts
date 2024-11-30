import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { RegionFinanceAppSuffixService } from '../service/region-finance-app-suffix.service';
import { IRegionFinanceAppSuffix } from '../region-finance-app-suffix.model';
import { RegionFinanceAppSuffixFormService } from './region-finance-app-suffix-form.service';

import { RegionFinanceAppSuffixUpdateComponent } from './region-finance-app-suffix-update.component';

describe('RegionFinanceAppSuffix Management Update Component', () => {
  let comp: RegionFinanceAppSuffixUpdateComponent;
  let fixture: ComponentFixture<RegionFinanceAppSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let regionFormService: RegionFinanceAppSuffixFormService;
  let regionService: RegionFinanceAppSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegionFinanceAppSuffixUpdateComponent],
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
      .overrideTemplate(RegionFinanceAppSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RegionFinanceAppSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    regionFormService = TestBed.inject(RegionFinanceAppSuffixFormService);
    regionService = TestBed.inject(RegionFinanceAppSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const region: IRegionFinanceAppSuffix = { id: 456 };

      activatedRoute.data = of({ region });
      comp.ngOnInit();

      expect(comp.region).toEqual(region);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegionFinanceAppSuffix>>();
      const region = { id: 123 };
      jest.spyOn(regionFormService, 'getRegionFinanceAppSuffix').mockReturnValue(region);
      jest.spyOn(regionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ region });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: region }));
      saveSubject.complete();

      // THEN
      expect(regionFormService.getRegionFinanceAppSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(regionService.update).toHaveBeenCalledWith(expect.objectContaining(region));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegionFinanceAppSuffix>>();
      const region = { id: 123 };
      jest.spyOn(regionFormService, 'getRegionFinanceAppSuffix').mockReturnValue({ id: null });
      jest.spyOn(regionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ region: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: region }));
      saveSubject.complete();

      // THEN
      expect(regionFormService.getRegionFinanceAppSuffix).toHaveBeenCalled();
      expect(regionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegionFinanceAppSuffix>>();
      const region = { id: 123 };
      jest.spyOn(regionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ region });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(regionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
