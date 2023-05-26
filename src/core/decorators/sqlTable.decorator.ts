import "reflect-metadata";

export function SqlTable(instance: any) {
  const propertyKeys = Object.getOwnPropertyNames(instance);
  for (const key of propertyKeys) {
    const metadata = Reflect.getMetadata(key, instance, key);
    console.log(`${metadata},`);
  }
}
