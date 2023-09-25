import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CandidateService{
    constructor(private http: HttpClient){}
    
    addCandidate(data: any): Observable<any>{
        return this.http.post('https://localhost:7242/Candidate/AddCandidate',data);
    }

    getCandidates(): Observable<any>{
        return this.http.get('https://localhost:7242/Candidate/GetAllCandidates');
    }

    deleteCandidate(id: number): Observable<any>{
        debugger
        return this.http.delete(`https://localhost:7242/Candidate/DeleteCandidate?id=${id}`);
    }

    updateCandidate(id: number, data: any): Observable<any> {
        debugger
        //return this.http.post(`https://localhost:7242/Candidate/UpdateCandidate`, data);
        return this.http.put('https://localhost:7242/Candidate',data);
      }
}