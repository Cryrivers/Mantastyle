import MantaStyle from "../index";
import { Type } from "../utils/baseType";

export default class TypeReference extends Type {
  private referenceName: string;
  private deferredArgumentedTypes: Type[] = [];
  constructor(referenceName: string) {
    super();
    this.referenceName = referenceName;
  }
  public argumentTypes(types: Type[]) {
    this.deferredArgumentedTypes = types;
    return this;
  }
  public deriveLiteralType() {
    return this.getActualType().deriveLiteralType();
  }
  public getActualType() {
    // Evaluate Generics
    const actualType = MantaStyle._referenceType(this.referenceName);
    actualType.argumentTypes(this.deferredArgumentedTypes);
    return actualType;
  }
}
