import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChecklistItem {
  id: string
  text: string
  completed: boolean
  category: string
}

interface ChecklistCategory {
  id: string
  name: string
  items: ChecklistItem[]
}

const defaultCategories: ChecklistCategory[] = [
  {
    id: '1',
    name: 'Pre-Interview Preparation',
    items: [
      {
        id: '1-1',
        text: 'Research company background and culture',
        completed: false,
        category: '1'
      },
      {
        id: '1-2',
        text: 'Understand job requirements and responsibilities',
        completed: false,
        category: '1'
      },
      { id: '1-3', text: 'Prepare self-introduction', completed: false, category: '1' },
      {
        id: '1-4',
        text: 'Prepare answers to common interview questions',
        completed: false,
        category: '1'
      },
      {
        id: '1-5',
        text: 'Prepare questions to ask the interviewer',
        completed: false,
        category: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Technical Preparation',
    items: [
      { id: '2-1', text: 'Review technical knowledge points', completed: false, category: '2' },
      { id: '2-2', text: 'Prepare project experience sharing', completed: false, category: '2' },
      { id: '2-3', text: 'Practice coding problems', completed: false, category: '2' },
      {
        id: '2-4',
        text: 'Prepare technical demonstrations (if needed)',
        completed: false,
        category: '2'
      }
    ]
  },
  {
    id: '3',
    name: 'Interview Day',
    items: [
      {
        id: '3-1',
        text: 'Confirm interview time and location/link',
        completed: false,
        category: '3'
      },
      { id: '3-2', text: 'Prepare professional attire', completed: false, category: '3' },
      { id: '3-3', text: 'Prepare printed copies of resume', completed: false, category: '3' },
      { id: '3-4', text: 'Arrive 15-30 minutes early', completed: false, category: '3' },
      {
        id: '3-5',
        text: 'Check equipment (for remote interviews)',
        completed: false,
        category: '3'
      }
    ]
  },
  {
    id: '4',
    name: 'Post-Interview Follow-up',
    items: [
      { id: '4-1', text: 'Send thank-you email', completed: false, category: '4' },
      {
        id: '4-2',
        text: 'Record interview key points and reflections',
        completed: false,
        category: '4'
      },
      {
        id: '4-3',
        text: 'Follow up on interview results at appropriate time',
        completed: false,
        category: '4'
      }
    ]
  }
]

const InterviewChecklistPage = () => {
  const [categories, setCategories] = useState<ChecklistCategory[]>(defaultCategories)
  const [newItemText, setNewItemText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [showAddCategory, setShowAddCategory] = useState(false)

  const handleAddItem = () => {
    if (!newItemText.trim() || !selectedCategory) return

    const newItem: ChecklistItem = {
      id: `${selectedCategory}-${Date.now()}`,
      text: newItemText,
      completed: false,
      category: selectedCategory
    }

    setCategories(
      categories.map((category) =>
        category.id === selectedCategory
          ? { ...category, items: [...category.items, newItem] }
          : category
      )
    )
    setNewItemText('')
  }

  const handleToggleItem = (itemId: string, categoryId: string) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              )
            }
          : category
      )
    )
  }

  const handleDeleteItem = (itemId: string, categoryId: string) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.filter((item) => item.id !== itemId)
            }
          : category
      )
    )
  }

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return

    const newCategory: ChecklistCategory = {
      id: Date.now().toString(),
      name: newCategoryName,
      items: []
    }

    setCategories([...categories, newCategory])
    setNewCategoryName('')
    setShowAddCategory(false)
    setSelectedCategory(newCategory.id)
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((category) => category.id !== categoryId))
    if (selectedCategory === categoryId) {
      setSelectedCategory(categories[0]?.id || '')
    }
  }

  const getCompletionPercentage = (category: ChecklistCategory) => {
    if (category.items.length === 0) return 0
    const completedItems = category.items.filter((item) => item.completed).length
    return Math.round((completedItems / category.items.length) * 100)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Interview Preparation Checklist</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                    selectedCategory === category.id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div>
                    <span>{category.name}</span>
                    <div className="text-xs text-gray-500">
                      {category.items.length} items ({getCompletionPercentage(category)}% complete)
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteCategory(category.id)
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
            {showAddCategory ? (
              <div className="mt-4">
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="mb-2"
                />
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleAddCategory}>
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowAddCategory(false)
                      setNewCategoryName('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setShowAddCategory(true)}
              >
                Add New Category
              </Button>
            )}
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="p-4">
            {categories.length > 0 && selectedCategory ? (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  {categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <div className="flex items-center space-x-2 mb-6">
                  <Input
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="Add new checklist item"
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddItem()
                    }}
                  />
                  <Button onClick={handleAddItem}>Add</Button>
                </div>

                <div className="space-y-2">
                  {categories
                    .find((c) => c.id === selectedCategory)
                    ?.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 border rounded"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => handleToggleItem(item.id, selectedCategory)}
                            id={`item-${item.id}`}
                            className="h-4 w-4"
                          />
                          <label
                            htmlFor={`item-${item.id}`}
                            className={`cursor-pointer ${
                              item.completed ? 'line-through text-gray-500' : ''
                            }`}
                          >
                            {item.text}
                          </label>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id, selectedCategory)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                </div>

                {categories.find((c) => c.id === selectedCategory)?.items.length === 0 && (
                  <p className="text-center text-gray-500 my-8">
                    No checklist items yet. Please add a new item.
                  </p>
                )}
              </>
            ) : (
              <p className="text-center text-gray-500 my-8">Please select or create a category</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default InterviewChecklistPage
