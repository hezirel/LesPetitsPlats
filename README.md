# Les Petits Plats - Algorithm Comparison Study

## General Informations

Les Petits Plats - 7th project of my Open Classrooms JavaScript / React Developper Diploma

## Mission

Comparison study between 2 searchs algorithms

### Problem

Finding occurence of a string inside specific potentially nested properties of given data object

Also called 'strstr' => String Searching Algorithm

#### Data Format

```js
const dataTemplate = {
    "id": 2,
        "name": "Poisson Cru à la tahitienne",
        "servings": 2,
        "ingredients": [{
                "ingredient": "Thon Rouge (ou blanc)",
                "quantity": 200,
                "unit": "grammes"
            }],
        "time": 60,
        "description": "Découper le thon en dés, mettre dans un plat et recouvrir de jus de citron vert (mieux vaut prendre un plat large et peu profond). Laisser reposer au réfrigérateur au moins 2 heures. (Si possible faites-le le soir pour le lendemain. Après avoir laissé mariner le poisson, coupez le concombre en fines rondelles sans la peau et les tomates en prenant soin de retirer les pépins. Rayer la carotte. Ajouter les légumes au poissons avec le citron cette fois ci dans un Saladier. Ajouter le lait de coco. Pour ajouter un peu plus de saveur vous pouver ajouter 1 à 2 cuillères à soupe de Crème de coco",
        "appliance": "Saladier",
        "ustensils": ["presse citron"]
}
```

### Algorithms

In the String Searching algorithm world we follow the below notations conventions:

| Variable | Description |
| --- | --- |
| Needle | Search target pattern |
| m | Length of needle |
| Hay | Data being searched for Needle |
| n | Length of hay |

#### Native

Use of basic for loop

Classified as a Naive Search String Algorithm

Complexity: O(mn)

#### Functionnal

Use of Array.prototype(.forEach || .map)

Under the hood, V8 use the same naive search string algorithm
Except primitive Arrays Object are optimized by TurbFan in V8 by leveraging ["Sea of Nodes"](https://darksi.de/d.sea-of-nodes/) concept and use of Control/Data Flow Graph

Complexity: O(mn)

#### Knuth Morris Pratt

Custom implementation of [Knuth-Morris-Pratt](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)

Complexity: O(m) Preprocessing + O(n) Matching

### [Results Report](study/hmreport.pdf)