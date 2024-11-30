import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IRegionFinanceAppSuffix } from 'app/entities/region-finance-app-suffix/region-finance-app-suffix.model';
import { RegionFinanceAppSuffixService } from 'app/entities/region-finance-app-suffix/service/region-finance-app-suffix.service';
import { CountryFinanceAppSuffixService } from '../service/country-finance-app-suffix.service';
import { ICountryFinanceAppSuffix } from '../country-finance-app-suffix.model';
import { CountryFinanceAppSuffixFormService } from './country-finance-app-suffix-form.service';

import { CountryFinanceAppSuffixUpdateComponent } from './country-finance-app-suffix-update.component';

describe('CountryFinanceAppSuffix Management Update Component', () => {
  let comp: CountryFinanceAppSuffixUpdateComponent;
  let fixture: ComponentFixture<CountryFinanceAppSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let countryFormService: CountryFinanceAppSuffixFormService;
  let countryService: CountryFinanceAppSuffixService;
  let regionService: RegionFinanceAppSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CountryFinanceAppSuffixUpdateComponent],
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
      .overrideTemplate(CountryFinanceAppSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CountryFinanceAppSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    countryFormService = TestBed.inject(CountryFinanceAppSuffixFormService);
    countryService = TestBed.inject(CountryFinanceAppSuffixService);
    regionService = TestBed.inject(RegionFinanceAppSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call region query and add missing value', () => {
      const country: ICountryFinanceAppSuffix = { id: 456 };
      const region: IRegionFinanceAppSuffix = { id: 17703 };
      country.region = region;

      const regionCollection: IRegionFinanceAppSuffix[] = [{ id: 28738 }];
      jest.spyOn(regionService, 'query').mockReturnValue(of(new HttpResponse({ body: regionCollection })));
      const expectedCollection: IRegionFinanceAppSuffix[] = [region, ...regionCollection];
      jest.spyOn(regionService, 'addRegionFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ country });
      comp.ngOnInit();

      expect(regionService.query).toHaveBeenCalled();
      expect(regionService.addRegionFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(regionCollection, region);
      expect(comp.regionsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const country: ICountryFinanceAppSuffix = { id: 456 };
      const region: IRegionFinanceAppSuffix = { id: 25002 };
      country.region = region;

      activatedRoute.data = of({ country });
      comp.ngOnInit();

      expect(comp.regionsCollection).toContain(region);
      expect(comp.country).toEqual(country);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICountryFinanceAppSuffix>>();
      const country = { id: 123 };
      jest.spyOn(countryFormService, 'getCountryFinanceAppSuffix').mockReturnValue(country);
      jest.spyOn(countryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ country });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: country }));
      saveSubject.complete();

      // THEN
      expect(countryFormService.getCountryFinanceAppSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(countryService.update).toHaveBeenCalledWith(expect.objectContaining(country));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICountryFinanceAppSuffix>>();
      const country = { id: 123 };
      jest.spyOn(countryFormService, 'getCountryFinanceAppSuffix').mockReturnValue({ id: null });
      jest.spyOn(countryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ country: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: country }));
      saveSubject.complete();

      // THEN
      expect(countryFormService.getCountryFinanceAppSuffix).toHaveBeenCalled();
      expect(countryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICountryFinanceAppSuffix>>();
      const country = { id: 123 };
      jest.spyOn(countryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ country });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(countryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareRegionFinanceAppSuffix', () => {
      it('Should forward to regionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(regionService, 'compareRegionFinanceAppSuffix');
        comp.compareRegionFinanceAppSuffix(entity, entity2);
        expect(regionService.compareRegionFinanceAppSuffix).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
