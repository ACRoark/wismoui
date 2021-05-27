
import getDteContactNumber from '../getDteContactNumber';

describe('getDteContactNumber', (): void => {
  it('should not log errors in console when valid category is passed', (): void => {
    const spy = jest.spyOn(global.console, 'error');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should return 3132356655 when value of R975 is passed', (): void => {
    expect(getDteContactNumber('R975')).toEqual('3132356655');
  });

  it('should return 8004416698 when value of R980 is passed', (): void => {
    expect(getDteContactNumber('R980')).toEqual('8004416698');
  });

  it('should return 8558517152 when value of R981 is passed', (): void => {
    expect(getDteContactNumber('R981')).toEqual('8558517152');
  });

  it('should return 8772000438 when value of R982 is passed', (): void => {
    expect(getDteContactNumber('R982')).toEqual('8772000438');
  });

  it('should return 8663112244 when value of R983 is passed', (): void => {
    expect(getDteContactNumber('R983')).toEqual('8663112244');
  });

  it('should return 8558387258 when value of R987 is passed', (): void => {
    expect(getDteContactNumber('R987')).toEqual('8558387258');
  });

});
