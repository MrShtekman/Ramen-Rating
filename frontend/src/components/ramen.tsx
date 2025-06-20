import convertDate from "@/util/convertDate";

const Ramen = ({ object, className = '' }: { object: RamenProps, className?: string }) => {
    const { name, price, rating, created, flavor, components } = object;
    return (
        <div className={`flex flex-col gap-3 border ${className}`}>
            <h1>Name: {name}</h1>
            <p>Price: {price}</p>
            <p>Rating: {rating}</p>
            <p>Created: {convertDate(created)}</p>
            {flavor && (
                <div>
                    <h2>Flavor Profile:</h2>
                    <p>Saltiness: {flavor.saltiness}</p>
                    <p>Spiciness: {flavor.spiciness}</p>
                    <p>Sweetness: {flavor.sweetness}</p>
                    <p>Umami: {flavor.umami}</p>
                    <p>Bitterness: {flavor.bitterness}</p>
                </div>
            )}
            {components && (
                <div>
                    <h2>Components:</h2>
                    <p>Broth: {components.broth}</p>
                    <p>Toppings: {components.toppings.join(', ')}</p>
                    <p>Noodles: {components.noodles}</p>
                </div>
            )}
            
        </div>
    );
}

export type RamenProps = {
  name: string;
  price: number;
  rating: number;
  created: Date;
  flavor?: {
    saltiness: number;
    spiciness: number;
    sweetness: number;
    umami: number;
    bitterness: number;
  };
    components?: {
        broth: string;
        toppings: string[];
        noodles: string;
    };
}

export default Ramen;