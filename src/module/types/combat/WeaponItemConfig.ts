import { ABFItemBaseDataSource } from '../../../animabf.types';
import { ABFItems } from '../../items/ABFItems';
import { openDialog } from '../../utils/openDialog';
import { ABFItemConfig, DerivedField, ItemChanges } from '../Items';
import { AmmoDataSource } from './AmmoItemConfig';

export enum EquippedHandType {
  ONE_HANDED = 'one-handed',
  TWO_HANDED = 'two-handed'
}

export enum WeaponKnowledgeType {
  KNOWN = 'known',
  SIMILAR = 'similar',
  MIXED = 'mixed',
  DIFFERENT = 'different'
}

export enum WeaponCritic {
  CUT = 'cut',
  IMPACT = 'impact',
  THRUST = 'thrust',
  HEAT = 'heat',
  ELECTRICITY = 'electricity',
  COLD = 'cold',
  ENERGY = 'energy'
}

export enum NoneWeaponCritic {
  NONE = '-'
}

export type OptionalWeaponCritic = WeaponCritic | NoneWeaponCritic;

export enum ManageabilityType {
  ONE_HAND = 'one_hand',
  TWO_HAND = 'two_hands',
  ONE_OR_TWO_HAND = 'one_or_two_hands'
}

export enum ShotType {
  SHOT = 'shot',
  THROW = 'throw'
}

export type WeaponItemData = {
  special: { value: string };
  integrity: DerivedField;
  breaking: DerivedField;
  attack: { value: number };
  block: { value: number };
  damage: DerivedField;
  initiative: DerivedField;
  presence: DerivedField;
  size: { value: number };
  strRequired: {
    oneHand: { value: number };
    twoHands: { value: number };
  };
  quality: { value: number };
  oneOrTwoHanded: { value: EquippedHandType };
  knowledgeType: { value: WeaponKnowledgeType };
  manageabilityType: { value: ManageabilityType };
  shotType: { value: ShotType };
  hasOwnStr: { value: boolean };
  isRanged: { value: boolean };
  ammoId?: string;
  ammo?: AmmoDataSource;
  range: DerivedField;
  cadence: { value: string };
  reload: DerivedField;
  weaponFue: { value: number };
  critic: {
    primary: { value: WeaponCritic };
    secondary: { value: OptionalWeaponCritic };
  };
};

export type WeaponDataSource = ABFItemBaseDataSource<ABFItems.WEAPON, WeaponItemData>;

export type WeaponChanges = ItemChanges<WeaponItemData>;

export const INITIAL_WEAPON_DATA: WeaponItemData = {
  special: { value: '' },
  hasOwnStr: { value: false },
  integrity: {
    base: { value: 0 },
    final: { value: 0 }
  },
  breaking: {
    base: { value: 0 },
    final: { value: 0 }
  },
  attack: { value: 0 },
  block: { value: 0 },
  damage: {
    base: { value: 0 },
    final: { value: 0 }
  },
  initiative: {
    base: { value: 0 },
    final: { value: 0 }
  },
  presence: {
    base: { value: 0 },
    final: { value: 0 }
  },
  size: { value: 0 },
  strRequired: {
    oneHand: { value: 0 },
    twoHands: { value: 0 }
  },
  quality: { value: 0 },
  oneOrTwoHanded: { value: EquippedHandType.ONE_HANDED },
  knowledgeType: { value: WeaponKnowledgeType.KNOWN },
  manageabilityType: { value: ManageabilityType.ONE_HAND },
  shotType: { value: ShotType.SHOT },
  isRanged: { value: false },
  cadence: { value: '' },
  range: {
    base: { value: 0 },
    final: { value: 0 }
  },
  reload: {
    base: { value: 0 },
    final: { value: 0 }
  },
  weaponFue: { value: 0 },
  critic: {
    primary: { value: WeaponCritic.CUT },
    secondary: { value: NoneWeaponCritic.NONE }
  }
};

export const WeaponItemConfig: ABFItemConfig<WeaponDataSource, WeaponChanges> = {
  type: ABFItems.WEAPON,
  isInternal: false,
  hasSheet: true,
  fieldPath: ['combat', 'weapons'],
  getFromDynamicChanges: changes => {
    return changes.data.dynamic.weapons as WeaponChanges;
  },
  selectors: {
    addItemButtonSelector: 'add-weapon',
    containerSelector: '#weapons-context-menu-container',
    rowSelector: '.weapon-row'
  },
  onCreate: async (actor): Promise<void> => {
    const { i18n } = game as Game;

    const name = await openDialog<string>({
      content: i18n.localize('dialogs.items.weapons.content')
    });

    const itemData: Omit<WeaponDataSource, '_id'> = {
      name,
      type: ABFItems.WEAPON,
      data: INITIAL_WEAPON_DATA
    };

    await actor.createItem(itemData);
  },
  onUpdate: async (actor, changes): Promise<void> => {
    for (const id of Object.keys(changes)) {
      const { name, data } = changes[id];

      actor.updateItem({
        id,
        name,
        data
      });
    }
  },
  onAttach: (data, item) => {
    const combat = data.combat as { weapons: WeaponDataSource[]; ammo: AmmoDataSource[] };

    const items = combat.weapons;

    item.data = foundry.utils.mergeObject(item.data, INITIAL_WEAPON_DATA, { overwrite: false });

    if (items) {
      const itemIndex = items.findIndex(i => i._id === item._id);
      if (itemIndex !== -1) {
        items[itemIndex] = item;
      } else {
        items.push(item);
      }
    } else {
      combat.weapons = [item];
    }

    combat.weapons = combat.weapons.map(weapon => {
      if (weapon.data.isRanged && typeof weapon.data.ammoId === 'string' && !!weapon.data.ammoId) {
        const ammo = combat.ammo as AmmoDataSource[];

        weapon.data.ammo = ammo.find(i => i._id === weapon.data.ammoId);
      }

      return weapon;
    });
  }
};
