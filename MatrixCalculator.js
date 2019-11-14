class MatrixCalculator {
	constructor() {
		this.matrixA = [][];
		this.matrixB = [][];
		this.AxDimension = 0;
		this.AyDimension = 0;
		this.BxDimension = 0;
		this.ByDimension = 0;
	}
	
	rebuildMatrix() {
		var row1 = document.getElementsByClassName("m1r1");
		var row2 = document.getElementsByClassName("m1r2");
		var row3 = document.getElementsByClassName("m1r3");
		this.matrixA[0] = row1;
		this.matrixA[1] = row2;
		this.matrixA[2] = row3;
		row1 = document.getElementsByClassName("m2r1");
		row2 = document.getElementsByClassName("m2r2");
		row3 = document.getElementsByClassName("m2r3");
		this.matrixB[0] = row1;
		this.matrixB[1] = row2;
		this.matrixB[2] = row3;
		calculateDimensions();
	}
	
	calculateDimensions() {
		//Calculating matrix A's dimensions
		this.AyDimension = 3;
		this.AxDimension = 3;
		
		var count = 2;
		//If there's a whole column of 0's, we'll decrease the dimension and look at the next one.
		while (this.matrixA[0][count]==0 && this.matrixA[1][count]==0 && this.matrixA[2][count]==0 && count>=0) {
			this.AxDimension--;
			count--;
		}
		count = 2;
		//If there's a whole row of 0's, we'll decrease the dimension and look at the next one.
		while (this.matrixA[count][0]==0 && this.matrixA[count][1]==0 && this.matrixA[count][2]==0 && count>=0) {
			this.AyDimension--;
			count--;
		}
		
		//Calculating matrix B's dimensions
		this.ByDimension = 3;
		this.BxDimension = 3;
		
		var count = 2;
		while (this.matrixB[0][count]==0 && this.matrixB[1][count]==0 && this.matrixB[2][count]==0 && count>=0) {
			this.BxDimension--;
			count--;
		}
		count = 2;
		while (this.matrixB[count][0]==0 && this.matrixB[count][1]==0 && this.matrixB[count][2]==0 && count>=0) {
			this.ByDimension--;
			count--;
		}		
	}
}