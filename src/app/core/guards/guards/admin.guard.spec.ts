import { TestBed } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let registerServiceSpy: jasmine.SpyObj<RegisterService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const registerSpy = jasmine.createSpyObj('RegisterService', ['getUserRole']);
    const rSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: RegisterService, useValue: registerSpy },
        { provide: Router, useValue: rSpy }
      ]
    });

    guard = TestBed.inject(AdminGuard);
    registerServiceSpy = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access for admin role', () => {
    registerServiceSpy.getUserRole.and.returnValue('admin');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should deny access for user role and navigate', () => {
    registerServiceSpy.getUserRole.and.returnValue('user');
    expect(guard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});