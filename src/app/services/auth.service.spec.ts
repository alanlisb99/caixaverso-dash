import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve armazenar o token ao fazer login', () => {
    const mockResponse = { token: 'abc123' };

    service.login('email@test.com', '1234').subscribe(() => {
      const saved = service.getToken();
      expect(saved).toBe('abc123');
    });

    const req = httpMock.expectOne('http://localhost:3000/autenticacao/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('deve remover token ao fazer logout', () => {
    service.setToken('123');
    service.logout();
    expect(service.getToken()).toBeNull();
  });
});
