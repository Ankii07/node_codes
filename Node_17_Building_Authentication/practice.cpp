/******************************************************************************

Welcome to GDB Online.
GDB online is an online compiler and debugger tool for C, C++, Python, Java, PHP, Ruby, Perl,
C#, OCaml, VB, Swift, Pascal, Fortran, Haskell, Objective-C, Assembly, HTML, CSS, JS, SQLite, Prolog.
Code, Compile, Run and Debug online from anywhere in world.

*******************************************************************************/
#include<bits/stdc++.h>
using namespace std;


void solve(vector<vector<int>>&mat,int i, int j, string temp, vector<string>& result, int n){
        cout<<i<<" "<<j<<" ";
        if(mat[i][j] == 0) return;
        // cout<<i<<" "<<j<<" ";
       if(i == n-1 && j == n-1){
           cout<<temp<<" ";
           result.push_back(temp);
           return;
       }
       
       if(i>0){
            mat[i][j] =0;
            temp= temp+"U";
           solve(mat,i-1,j,temp,result, n);
           temp.pop_back();
           mat[i][j] =1;
       }
        if(i<n){
            mat[i][j] =0;
            temp =temp+"D",
           solve(mat,i+1,j,temp,result, n);
           temp.pop_back();
           mat[i][j] =1;
       }
        if(j>0){
            mat[i][j] =0;
            temp= temp+"L";
           solve(mat,i,j-1,temp,result, n);
           temp.pop_back();
           mat[i][j] =1;
       }
        if(j<n){
            mat[i][j] =0;
            temp = temp+"R";
           solve(mat,i,j+1,temp,result, n);
           temp.pop_back();
           mat[i][j] =1;
       }
}

 vector<string> findPath(vector<vector<int>> &mat) {
        // code here
        string temp ="";
        vector<string> result;
        int n = mat.size();
        int i=0,j=0;
        solve(mat,i,j, temp, result, n);
        return result;
        
    }


int main()
{  
     vector<vector<int>> mat{
        {1, 0, 0, 0},
        {1, 1, 0, 1},
        {1, 1, 0, 0},
        {0, 1, 1, 1}
    };
     
    vector<string> result1;
    
     result1 = findPath(mat);
     int n = result1.size();
     for(int i =0; i<n;i++){
         cout<<result1[i]<<" ";
     }
    
    return 0;
}