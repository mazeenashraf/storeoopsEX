import { TestBed } from '@angular/core/testing';
import { UserGuard } from './user.guard';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';

describe('UserGuard', () => {
  let guard: UserGuard;
  let registerServiceSpy: jasmine.SpyObj<RegisterService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const rSpy = jasmine.createSpyObj('Router', ['navigate']);
    const registerSpy = jasmine.createSpyObj('RegisterService', ['getUserRole']);

    TestBed.configureTestingModule({
      providers: [
        UserGuard,
        { provide: RegisterService, useValue: registerSpy },
        { provide: Router, useValue: rSpy }
      ]
    });

    guard = TestBed.inject(UserGuard);
    registerServiceSpy = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access for user role', () => {
    registerServiceSpy.getUserRole.and.returnValue('user');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should deny access if role is not user', () => {
    registerServiceSpy.getUserRole.and.returnValue('admin');
    expect(guard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/not-authorized']);
  });
});