class MatrixCalculator {
	constructor() {
		this.matrixA = [];
		this.matrixB = [];
		for(var i=0; i<3; i++) {
			this.matrixA[i] = [];
			this.matrixB[i] = [];
		}
		
		this.AxDimension = 3;
		this.AyDimension = 3;
		this.BxDimension = 3;
		this.ByDimension = 3;
	}
	
	calculateRank() {
		this.rebuildMatrix();
		
		var rank = this.AxDimension;
		var row = this.AyDimension;
		var mat = this.matrixA;
		
		for (row = 0; row < rank; row++) { 
			if (mat[row][row]) { 
			   for (var col = 0; col < this.AyDimension; col++) { 
				   if (col != row) { 
					 var mult = Math.round(mat[col][row] / mat[row][row]*100)/100; 
					 for (var i = 0; i < rank; i++) 
					   mat[col][i] -= mult * mat[row][i]; 
				  } 
			   } 
			} 
			else
			{ 
				var reduce = true; 
				for (var i = row + 1; i < this.AyDimension;  i++) 
				{ 
					if (mat[i][row]) 
					{ 
						var aux = mat[row];
						mat[row] = math[i];
						math[i] = aux;
						reduce = false; 
						break; 
					} 
				} 
				if (reduce) 
				{ 
					rank--; 
					for (i = 0; i < this.AyDimension; i++) 
						mat[i][row] = mat[i][rank]; 
				} 
				row--; 
			} 
		} 
		this.printOnConsole("Matrix rank is: "+rank); 		
	}
	
	invertMatrix() {		
		this.calculateDeterminant();
		if (this.determinantA==null)
			return; //Error will already be printed out by calculateDeterminant method.
		if(this.determinantA==0) {
			this.printOnConsole("Matrix is non-invertible.");
			return;
		}
		var adjacent = [];
		var result = [];
		var aux = [];
		for(var i=0; i<3; i++) {
			adjacent[i] = [];
			result[i] = [];
			aux[i]=[];
		}
		//Calculating adjacency matrix
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				if (this.AxDimension == 1)
					adjacent[i][j] = 1+"/"+this.matrixA[i][j];
				if (this.AxDimension==2) {
					adjacent[j][i] = ((-1)**(i+1+j+1))*this.matrixA[i][j];
				}
				if (this.AxDimension==3) { 
					//Reconstructing 2 dimension sub matrix
					var count1 = 0;
					var count2 = 0;
					for (var k=0; k<3; k++) {
						for (var l=0; l<3; l++) {
							if (l!=j && k!=i) {
								aux[count1][count2]=this.matrixA[k][l];
								count2++;
							}
						}
						count2 = 0;
						if (k!=i)
							count1++;
					}
					adjacent[i][j] = ((-1)**(i+1+j+1))*(aux[0][0]*aux[1][1]-aux[0][1]*aux[1][0]);
				}
			}
		}
		//Transposing it
		for (var i =0; i<this.AxDimension; i++) {
			for (var j=0; j<this.AyDimension; j++) {
				result[i][j]=adjacent[j][i];
			}
		}
		if (this.AxDimension==2) {
			var temp = result[0][0];
			result[0][0] = result[1][1];
			result[1][1] = temp;
		}
		
		//We divide by the determinant
		if (this.AxDimension!=1) {
			for (var i =0; i<this.AxDimension; i++) {
				for (var j=0; j<this.AyDimension; j++) {
					result[i][j]=Math.round(result[i][j]/this.determinantA*100)/100;
				}
			}
		}
		
		var string = "Inverse matrix:\r";
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				string=string+"\t"+result[i][j];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
		
	}
	
	transposeMatrix() {
		this.rebuildMatrix();
		var string = "Transposition result:\r";
		for (var i =0; i<this.AxDimension; i++) {
			for (var j=0; j<this.AyDimension; j++) {
				string=string+"\t"+this.matrixA[j][i];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
	
	subtractMatrix() {
		this.rebuildMatrix();
		if (this.AxDimension!=this.AyDimension) {
			this.printOnConsole("Matrices have different dimmensions.");
			return;
		}
		var result = [];
		for(var i=0; i<3; i++) 
			result[i]=[];
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				result[i][j]=Math.round((parseFloat(this.matrixA[i][j])-parseFloat(this.matrixB[i][j]))*100)/100;
			}
		}
		var string = "Subtraction result:\r";
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				string=string+"\t"+result[i][j];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
	
	addMatrix() {
		this.rebuildMatrix();
		if (this.AxDimension!=this.AyDimension) {
			this.printOnConsole("Matrices have different dimmensions.");
			return;
		}
		var result = [];
		for(var i=0; i<3; i++) 
			result[i]=[];
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				//Parsing is necessary here since addition operator can also concatenate strings
				result[i][j]=Math.round((parseFloat(this.matrixA[i][j])+parseFloat(this.matrixB[i][j]))*100)/100;
			}
		}
		var string = "Addition result:\r";
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				string=string+"\t"+result[i][j];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
	
	multiplyMatrix() {
		this.rebuildMatrix();
		if (this.AxDimension!=this.ByDimension) {
			this.printOnConsole("Number of columns on A is different from number of rows on B.");
			return;
		}
		var result = [];
		for(var i=0; i<3; i++) 
			result[i]=[];
		i=0;
		var j=0;
		//x refers to columns, y refers to rows
		var rowsRes = this.AyDimension;
		var columnsRes = this.BxDimension;
		
		for (i=0; i<rowsRes; i++) {
			for (j=0; j<columnsRes; j++) {
				result[i][j] = this.matrixA[i][0]*this.matrixB[0][j]+this.matrixA[i][1]*this.matrixB[1][j]+this.matrixA[i][2]*this.matrixB[2][j];
				result[i][j] = Math.round(result[i][j]*100)/100;
			}
		}
		var string = "Multiplication result:\r";
		for (i=0; i<rowsRes; i++) {
			for (j=0; j<columnsRes; j++) {
				string=string+"\t"+result[i][j];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
	
	calculateDeterminant() {
		this.rebuildMatrix();
		if (this.AxDimension!=this.AyDimension) {
			this.determinantA=null;
			this.printOnConsole("Non-square matrix, determinant cannot be calculated.");
			return;
		}
		var determinant;
		if (this.AxDimension==1) {
			determinant = this.matrixA[0][0];
		}
		if (this.AxDimension==2) {
			determinant = (this.matrixA[0][0]*this.matrixA[1][1])-(this.matrixA[0][1]*this.matrixA[1][0]);
		}
		if (this.AxDimension==3) {
			var op1, op2, op3, r1, r2, r3;
			op1 = this.matrixA[0][0]*this.matrixA[1][1]*this.matrixA[2][2];
			op2 = this.matrixA[0][1]*this.matrixA[1][2]*this.matrixA[2][0];
			op3 = this.matrixA[0][2]*this.matrixA[1][0]*this.matrixA[2][1];
			r1 = this.matrixA[0][2]*this.matrixA[1][1]*this.matrixA[2][0];
			r2 = this.matrixA[0][0]*this.matrixA[1][2]*this.matrixA[2][1];
			r3 = this.matrixA[0][1]*this.matrixA[1][0]*this.matrixA[2][2];
			determinant = Math.round((op1+op2+op3-r1-r2-r3)*100)/100;
		}
		this.determinantA = determinant;
		this.printOnConsole("Determinant: "+determinant)
		return;
	}
	
	printOnConsole(val) {
		document.getElementById("console").value = val;
	}
	
	rebuildMatrix() {
		var row1 = document.getElementsByClassName("m1r1");
		var row2 = document.getElementsByClassName("m1r2");
		var row3 = document.getElementsByClassName("m1r3");
		for (var i=0; i<3; i++) {
			this.matrixA[0][i] = row1[i].value;
			this.matrixA[1][i] = row2[i].value;
			this.matrixA[2][i] = row3[i].value;
		}
		row1 = document.getElementsByClassName("m2r1");
		row2 = document.getElementsByClassName("m2r2");
		row3 = document.getElementsByClassName("m2r3");
		for (var i=0; i<3; i++) {
			this.matrixB[0][i] = row1[i].value;
			this.matrixB[1][i] = row2[i].value;
			this.matrixB[2][i] = row3[i].value;
		}
		this.calculateDimensions();
	}
	
	calculateDimensions() {
		//Calculating matrix A's dimensions
		this.AyDimension = 3;
		this.AxDimension = 3;
		
		var count = 2;
		//If there's a whole column of 0's, we'll decrease the dimension and look at the next one.
		while (count>=0 && this.matrixA[0][count]==0 && this.matrixA[1][count]==0 && this.matrixA[2][count]==0) {
			this.AxDimension--;
			count--;
		}
		count = 2;
		//If there's a whole row of 0's, we'll decrease the dimension and look at the next one.
		while (count>=0 && this.matrixA[count][0]==0 && this.matrixA[count][1]==0 && this.matrixA[count][2]==0) {
			this.AyDimension--;
			count--;
		}
		
		//Calculating matrix B's dimensions in the same way
		this.ByDimension = 3;
		this.BxDimension = 3;
		
		var count = 2;
		while (count>=0 && this.matrixB[0][count]==0 && this.matrixB[1][count]==0 && this.matrixB[2][count]==0) {
			this.BxDimension--;
			count--;
		}
		count = 2;
		while (count>=0 && this.matrixB[count][0]==0 && this.matrixB[count][1]==0 && this.matrixB[count][2]==0) {
			this.ByDimension--;
			count--;
		}		
	}
}

var mc = new MatrixCalculator();