export class Create_Product {
    name: string;
    stock: number;
    price: number;
}

// contract lar entity deki product modelin aynısı olmuyor : api den gelen veya giden değerlere karşılık aynı tasarlıyoruz : hatta get , update , create için bile farklılaşabilir contracts