import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';


import { AuthService } from '../../services/auth.service';

describe('AuthGuard', () => {

  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
   
      isAuthenticated: jasmine.createSpy('isAuthenticated'),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      providers: [
        
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });


  });

  it('deve permitir acesso quando usuário está autenticado', () => {
    authServiceMock.isAuthenticated.and.returnValue(true);


    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('deve bloquear e redirecionar para /login quando não autenticado', () => {
    authServiceMock.isAuthenticated.and.returnValue(false);

    


  });
});

