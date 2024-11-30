import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICountryFinanceAppSuffix } from 'app/entities/country-finance-app-suffix/country-finance-app-suffix.model';
import { CountryFinanceAppSuffixService } from 'app/entities/country-finance-app-suffix/service/country-finance-app-suffix.service';
import { LocationFinanceAppSuffixService } from '../service/location-finance-app-suffix.service';
import { ILocationFinanceAppSuffix } from '../location-finance-app-suffix.model';
import { LocationFinanceAppSuffixFormService } from './location-finance-app-suffix-form.service';

import { LocationFinanceAppSuffixUpdateComponent } from './location-finance-app-suffix-update.component';

describe('LocationFinanceAppSuffix Management Update Component', () => {
  let comp: LocationFinanceAppSuffixUpdateComponent;
  let fixture: ComponentFixture<LocationFinanceAppSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let locationFormService: LocationFinanceAppSuffixFormService;
  let locationService: LocationFinanceAppSuffixService;
  let countryService: CountryFinanceAppSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LocationFinanceAppSuffixUpdateComponent],
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
      .overrideTemplate(LocationFinanceAppSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LocationFinanceAppSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    locationFormService = TestBed.inject(LocationFinanceAppSuffixFormService);
    locationService = TestBed.inject(LocationFinanceAppSuffixService);
    countryService = TestBed.inject(CountryFinanceAppSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call country query and add missing value', () => {
      const location: ILocationFinanceAppSuffix = { id: 456 };
      const country: ICountryFinanceAppSuffix = { id: 31773 };
      location.country = country;

      const countryCollection: ICountryFinanceAppSuffix[] = [{ id: 28155 }];
      jest.spyOn(countryService, 'query').mockReturnValue(of(new HttpResponse({ body: countryCollection })));
      const expectedCollection: ICountryFinanceAppSuffix[] = [country, ...countryCollection];
      jest.spyOn(countryService, 'addCountryFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ location });
      comp.ngOnInit();

      expect(countryService.query).toHaveBeenCalled();
      expect(countryService.addCountryFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(countryCollection, country);
      expect(comp.countriesCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const location: ILocationFinanceAppSuffix = { id: 456 };
      const country: ICountryFinanceAppSuffix = { id: 25355 };
      location.country = country;

      activatedRoute.data = of({ location });
      comp.ngOnInit();

      expect(comp.countriesCollection).toContain(country);
      expect(comp.location).toEqual(location);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILocationFinanceAppSuffix>>();
      const location = { id: 123 };
      jest.spyOn(locationFormService, 'getLocationFinanceAppSuffix').mockReturnValue(location);
      jest.spyOn(locationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ location });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: location }));
      saveSubject.complete();

      // THEN
      expect(locationFormService.getLocationFinanceAppSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(locationService.update).toHaveBeenCalledWith(expect.objectContaining(location));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILocationFinanceAppSuffix>>();
      const location = { id: 123 };
      jest.spyOn(locationFormService, 'getLocationFinanceAppSuffix').mockReturnValue({ id: null });
      jest.spyOn(locationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ location: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: location }));
      saveSubject.complete();

      // THEN
      expect(locationFormService.getLocationFinanceAppSuffix).toHaveBeenCalled();
      expect(locationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILocationFinanceAppSuffix>>();
      const location = { id: 123 };
      jest.spyOn(locationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ location });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(locationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCountryFinanceAppSuffix', () => {
      it('Should forward to countryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(countryService, 'compareCountryFinanceAppSuffix');
        comp.compareCountryFinanceAppSuffix(entity, entity2);
        expect(countryService.compareCountryFinanceAppSuffix).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
