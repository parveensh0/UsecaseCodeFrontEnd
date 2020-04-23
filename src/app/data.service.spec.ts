import { TestBed } from '@angular/core/testing';
import{ HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'; 
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,],
      providers:[DataService]});
      service = TestBed.get(DataService);
      httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retreive list of libraries from the API via GET', () => {
    const dummyLibraries = [{"id":1,"name":"Noida Library","books":[{"id":101,"name":"Mission Impossible-1","author":"XYZ"},
                                                                    {"id":102,"name":"Mission Impossible-2","author":"ABC"}]},
                            {"id":2,"name":"Delhi Library","books":[{"id":101,"name":"Mission Impossible-1","author":"XYZ"}]}];

    service.getLibraries().subscribe(libraries => {
      expect(libraries.length).toEqual(2);
      expect(libraries).toEqual(dummyLibraries);
    });
    const request = httpMock.expectOne(`${service.ROOT_URL}/libraries`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyLibraries);
  });

  it('should retreive list of books from particular library API via GET', () => {
   
   const dummyBooks = [{"id":1,"name":"Noida Library","books":[{"id":101,"name":"Mission Impossible-1","author":"XYZ"},
                                                                          {"id":102,"name":"Mission Impossible-2","author":"ABC"}]},
                       {"id":2,"name":"Delhi Library","books":[{"id":101,"name":"Mission Impossible-1","author":"XYZ"}]}]; 

    const lib_id = 2;
    service.getLibraryBooks(2).subscribe(libBook => {
      expect(libBook.books.length).toEqual(1);
      expect(libBook.name).toEqual("Delhi Library");
      expect(libBook.books[0].author).toEqual("XYZ");
      expect(libBook.books[0].name).toEqual("Mission Impossible-1");
    });
    const request = httpMock.expectOne(`${service.ROOT_URL}/libraries/${lib_id}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyBooks);
  });
});
