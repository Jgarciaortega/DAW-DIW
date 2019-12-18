import java.util.Scanner;

public class P522_LaDesconfianzaDeLaASALE {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);
		String palabra1;
		String palabra2;
		String solucion;

		while (sc.hasNext()) {

			palabra1 = sc.next();
			palabra2 = sc.next();

			solucion = comprueba(palabra1, palabra2);

			System.out.println(solucion);
		}

	}

	private static String comprueba(String palabra1, String palabra2) {

		int tamanyo;
		String solucion = "";
		
		/*Buscamos recorrer la palabra mas pequeña ya que si se llega al final y
		son iguales la mayor alfabeticamente sera la mas grande*/
		if(palabra1.length() > palabra2.length()) tamanyo = palabra2.length();
		else if (palabra1.length() < palabra2.length()) tamanyo = palabra1.length();
		else tamanyo = palabra1.length();
		
		for (int i = 0; i < tamanyo; i++) {
				
			//Si se llegamos al final la palabra menor sera la mas pequeña
			if(i == tamanyo-1) {
				
				if(palabra1.length()>palabra2.length()) solucion = palabra2;
				else solucion = palabra1;
				break;
			}
			
			if(palabra1.charAt(i) != palabra2.charAt(i)) {
				
				char car1 = palabra1.charAt(i);
				char car2 = palabra2.charAt(i);
				char previousCar1;
				char previousCar2;
			
				
				car1 = devuelveMinuscula(car1);
				car2 = devuelveMinuscula(car2);
				
				if(car1 != 'l' && car1 != 'c' && car2 != 'l' && car2 != 'c') {
					
					if(car1 > car2) solucion = palabra2;
					else solucion = palabra1;
					
					break;
					
				}else {
					
					previousCar1 = devuelveMinuscula (palabra1.charAt(i+1));
					previousCar2 = devuelveMinuscula (palabra2.charAt(i+1));
					
					
				}
				
			}
		}
		return solucion;
	}

	private static char devuelveMinuscula(char car) {
			
		return Character.toLowerCase(car);
	}

}
