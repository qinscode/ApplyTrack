import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Resume {
  id: string
  name: string
  description: string
  file?: File
  createdAt: Date
  updatedAt: Date
}

const ResumePage = () => {
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: '1',
      name: 'Software Engineer Resume',
      description: 'Resume tailored for software engineering positions',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-15')
    },
    {
      id: '2',
      name: 'Frontend Developer Resume',
      description: 'Resume focused on frontend development skills',
      createdAt: new Date('2023-02-10'),
      updatedAt: new Date('2023-03-05')
    }
  ])
  const [newResume, setNewResume] = useState({
    name: '',
    description: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [editMode, setEditMode] = useState<string | null>(null)

  const handleAddResume = () => {
    if (!newResume.name) return

    const resume: Resume = {
      id: Date.now().toString(),
      name: newResume.name,
      description: newResume.description,
      file: selectedFile || undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setResumes([...resumes, resume])
    setNewResume({ name: '', description: '' })
    setSelectedFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter((resume) => resume.id !== id))
  }

  const handleEditResume = (id: string) => {
    setEditMode(id)
    const resumeToEdit = resumes.find((resume) => resume.id === id)
    if (resumeToEdit) {
      setNewResume({
        name: resumeToEdit.name,
        description: resumeToEdit.description
      })
    }
  }

  const handleUpdateResume = () => {
    if (!editMode) return

    setResumes(
      resumes.map((resume) =>
        resume.id === editMode
          ? {
              ...resume,
              name: newResume.name,
              description: newResume.description,
              file: selectedFile || resume.file,
              updatedAt: new Date()
            }
          : resume
      )
    )
    setEditMode(null)
    setNewResume({ name: '', description: '' })
    setSelectedFile(null)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Resume Manager</h1>

      <Card className="mb-8 p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{editMode ? 'Edit Resume' : 'Add New Resume'}</h2>
        </div>
        <div>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Resume Name
              </label>
              <Input
                id="name"
                value={newResume.name}
                onChange={(e) => setNewResume({ ...newResume, name: e.target.value })}
                placeholder="Enter resume name"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Resume Description
              </label>
              <textarea
                id="description"
                value={newResume.description}
                onChange={(e) => setNewResume({ ...newResume, description: e.target.value })}
                placeholder="Enter resume description"
                className="w-full border rounded p-2"
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="file" className="block text-sm font-medium mb-1">
                Upload Resume File
              </label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="w-full"
                accept=".pdf,.doc,.docx"
              />
              {selectedFile && (
                <p className="mt-1 text-sm text-gray-500">Selected: {selectedFile.name}</p>
              )}
            </div>
            <div className="flex justify-end">
              {editMode ? (
                <div className="space-x-2">
                  <Button
                    onClick={() => {
                      setEditMode(null)
                      setNewResume({ name: '', description: '' })
                      setSelectedFile(null)
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateResume}>Update Resume</Button>
                </div>
              ) : (
                <Button onClick={handleAddResume}>Add Resume</Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <h2 className="text-xl font-semibold mb-4">My Resumes</h2>
      {resumes.length === 0 ? (
        <p className="text-gray-500">No resumes yet. Please add a new resume.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <Card key={resume.id} className="p-4">
              <div>
                <h3 className="text-lg font-medium mb-2">{resume.name}</h3>
                <p className="text-gray-600 mb-4">{resume.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>Created: {formatDate(resume.createdAt)}</p>
                  <p>Updated: {formatDate(resume.updatedAt)}</p>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditResume(resume.id)}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteResume(resume.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResumePage
