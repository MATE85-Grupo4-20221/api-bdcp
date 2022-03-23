import { EntityRepository, Repository } from "typeorm";
import { Component } from "../entities/Component";

@EntityRepository(Component)
class ComponentRepository extends Repository<Component> { }

export { ComponentRepository }